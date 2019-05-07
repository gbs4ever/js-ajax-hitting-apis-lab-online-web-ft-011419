
function getRepositories() {
  const username= document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}
//  when submit button clicked  should create the links also but it doesnt  work on that 
function displayRepositories() {
  let repos =JSON.parse(this.responseText)
  const passdata = '<ul>' +repos
    .map(
      r =>
      /// the out put is wrong  i want to inter plotae correctly 
      // owner  user r.owner.login
      '<li>' +
        `${r.name}` +
        ' - <a href= "' + `${r.html_url}` + '  " data-repository="' + `${r.name}` + 
        '"onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')+'</ul>';
  document.getElementById('repositories').innerHTML = passdata;
}

function getCommits(el){
  const user = document.getElementById("username").value
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  
  req.open('GET', `https://api.github.com/repos/${user}/${name}/commits`);
  req.send();
}




function displayCommits(){
  let commits = JSON.parse(this.responseText)
  const data =`<ul>${commits
      .map(
        c=> 
          '<li><h3>'+
            c.author.login +
          '</h3>' +
          c.commit.author.name+ '-'+ 
          c.commit.message +  
          '</li>'
        
      ).join('')}</ul>`;

  document.getElementById('details').innerHTML = data; 
}
function getBranches(el){
  const repoName = el.dataset.repository;
  const userName = el.dataset.username; // missing the link for this  in display repo 
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + userName + '/' + repoName + '/branches');
  req.send();
}



function displayBranches(){
  let branches = JSON.parse(this.responseText)
  const data = `<ul>${branches
    .map(branch => '<li>' + branch.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = data;
}