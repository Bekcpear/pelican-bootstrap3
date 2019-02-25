all: less trans

less: static/css/bootstrap.min.css

static/css/bootstrap.min.css: static/bootstrap/*.less static/bootstrap/mixins/*.less
	lessc static/bootstrap/bootstrap.less > static/css/bootstrap.css
	/home/u/node_modules/.bin/cleancss --s1 --advanced --compatibility=ie8 static/css/bootstrap.css -o static/css/bootstrap.min.css

TRANS_TARGET=$(shell find -iname "messages.po")
zh_Hant_TW=$(shell find -iname "zh_Hant_TW")

trans: zh_Hant_TW $(patsubst %/messages.po,%/messages.mo,$(TRANS_TARGET))
	mv translations/zh_Hant_TW translations/zht

zh_Hant_TW:
	mv translations/zht translations/zh_Hant_TW

%/messages.mo: %/messages.po
	opencc -c s2twp.json -i translations/zh/LC_MESSAGES/messages.po -o translations/zh_Hant_TW/LC_MESSAGES/messages.po
	sed -i 's/msgstr\s"許可說明"/msgstr "授權方式"/' translations/zh_Hant_TW/LC_MESSAGES/messages.po
	pybabel compile --directory translations/ --domain messages

%/messages.po: messages.pot
	pybabel update --input-file messages.pot --output-dir translations/ --domain messages

messages.pot: templates/*.html templates/includes/*.html babel.cfg
	pybabel extract --mapping babel.cfg --output messages.pot ./

cleanmo:
	find -iname "messages.mo" -exec rm -rf '{}' \;

cleancss:
	rm -f static/css/bootstrap.css
	rm -f static/css/bootstrap.min.css

.PHONY: less all trans cleanmo cleancss
