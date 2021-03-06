var github = (function(){
  function escapeHtml(str) {
    return $('<div/>').text(str).html();
  }
  function render(target, repos){
    var i = 0, fragment = '', t = $(target)[0];
    fragment += '<div class="list-group" id="github">';

    for(i = 0; i < repos.length; i++) {
      fragment += '<div class="list-group-item">'
      fragment += ' <div class="row-action-primary">'
      if(repos[i].fork){
        fragment += '   <i class="fa fa-code-fork"></i>'
      }else{
        fragment += '   <i class="fa fa-code"></i>'
      }
      fragment += ' </div>'
      fragment += ' <div class="row-content">'
      fragment += '   <h6 class="list-group-item-heading">'
      fragment += '     <a href="'+repos[i].html_url+'" target="_blank">'+repos[i].name+'</a>'
      fragment += '   </h6>'
      fragment += '   <div class="list-group-item-text"><small>'
      fragment += repos[i].description
      fragment += '   </small></div>'
      fragment += ' </div>'
      fragment += '</div>'
      fragment += '<div class="list-group-separator"></div>'
    }
    fragment += '</div>';
    t.innerHTML = fragment;
  }
  return {
    showRepos: function(options){
      var url = "https://api.github.com/users/"+options.user+"/repos"
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          var repos = [];
          if (!data) { console.log(data); return; }
          for (var i = 0; i < data.length; i++) {
            if (options.skip_forks && data[i].fork) { continue; }
            repos.push(data[i]);
          }
          repos.sort(function(a, b) {
            var aDate = new Date(a.pushed_at).valueOf(),
                bDate = new Date(b.pushed_at).valueOf();

            if (aDate === bDate) { return 0; }
            return aDate > bDate ? -1 : 1;
          });

          if (options.count) { repos.splice(options.count); }
          render(options.target, repos);
        } else {
          $(options.target + ' li.loading').addClass('error').text("Error loading feed");
        }
      }
      xhr.send();
    }
  };
})();
