class UI{
  constructor(){
    this.profile = document.querySelector('#profile');
    this.repoStarred = document.querySelector('#repo-starred');
    this.repoLastest = document.querySelector('#repo-lastest')
    this.defaultBio = 'I am a regular github user. Nothing much goes on with my life. But I plan to change that really soon!';
    this.defaultCompany = "I don't have one!";
    this.defaultBlog = "Still planning on it!";
    this.defaultLocation = "I live somewhere inside the globe!";
    this.defaultEmail = "Really can't remember!";
    this.defaultDesc = 'Just another github project!';
    this.defaultBadge = 'none'
  }

  getTime(time){
    let timeSplice = time.slice(0,-1);
    let date = new Date(timeSplice);
    let dateShortened = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let dataConvert = dateShortened.toLocaleString('en-us', { month: 'short' });
    return `${dataConvert} ${date.getDate()}, ${date.getFullYear()}`
  }


  displayUser(user){
    let uii = new UI;


    this.profile.innerHTML = `
      <div class="card profile-card mx-auto" style="max-width:30rem">
        <div class="card-img-block">
          <div class="my-5 heading">
            <h3 class="card-title profile-name">${(user.name) ? user.name : user.login}</h3>
          </div>
        </div>
        <div class="card-body pt-5">
          <img src="${user.avatar_url} alt="profile-image" class="profile">
          <div class="profile-username">
            <h6 class="card-title">@${user.login}</h6>
            <p class="dates">Member since: <span class="badge badge-primary p-1"> ${this.getTime(user.created_at)}</span></p>
          </div>

          <div class="bio py-3">
            <p class="card-text">${(user.bio) ? user.bio : this.defaultBio}</p>
          </div>
          <div class="info pb-2">
            <div class="row">
              <div class="col icons">
                <span><i class="fas fa-building"></i>${(user.company) ? user.company : this.defaultCompany}</span>
                <a href="#"><i class="fas fa-globe"></i>${(user.blog) ? user.blog : this.defaultBlog}</a>
                <span><i class="fas fa-map-marker-alt"></i>${(user.location) ? user.location : this.defaultLocation}</span>
                <span><i class="fas fa-envelope-open-text"></i>${(user.email) ? user.email : this.defaultEmail}</span>
              </div>
            </div>
          </div>
          <div class="pb-3">
            <h6 class="card-title m-1">Top Technologies used:</h6>
            <div id="lanBadges">
            ${uii.sortLanguages(user.repos_url)}
            </div>
          </div>

          <div class="icon-block">
            <div class="row footer">
              <div class="col-3 pf-left">
                <div class="repos profile-footer">
                  <h6>Repos</h6>
                  <p class="badge badge-primary">${user.public_repos}</p>
                </div>
              </div>
              <div class="col-3 pf">
                <div class="gists profile-footer">
                  <h6>Gists</h6>
                  <p class="badge badge-primary">${user.public_gists}</p>
                </div>
              </div>
              <div class="col-3 pf">
                <div class="followers profile-footer">
                  <h6>Followers</h6>
                  <p class="badge badge-primary">${user.followers}</p>
                </div>
              </div>
              <div class="col-3 pf">
                <div class="following profile-footer">
                  <h6>Following</h6>
                  <p class="badge badge-primary">${user.following}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="view">
          <a href="${user.html_url}" class="btn btn-lg btn-block text-light" target="_blank">View Profile</a>
        </div>
      </div>
      `
  }

  sortLanguages(url){
    let gt = new Github;

    fetch(`${url}?per_page=100&client_id=${gt.client_id}&client_secret=${gt.client_secret}`)
    .then(response => response.json())
    .then(data => {
      let list = {};
      data.forEach(d => {
        let dd = d.language;
        (dd in list) ? list[dd]+=1 : list[dd] = 1
      })

      let keys = [];
      for(let k in list){
        if(list.hasOwnProperty(k)){
          keys.push([k,list[k]])
        }
      }

      keys.sort((a,b)=>{
        return b[1] - a[1]
      })
       let kk = [];
      for(let a=0;a<keys.length;a++){
        if(keys[a][0] !== 'null'){
          kk.push(keys[a])
        }
      }
      let output;
      if(keys.length!=0){
        output =
        `<span class="badge badge-pill badge-primary">${(kk[0]) ? kk[0][0] : ''}</span>
        <span class="badge badge-pill badge-success">${(kk[1]) ? kk[1][0] : ''}</span>
        <span class="badge badge-pill badge-info">${(kk[2]) ? kk[2][0] : ''}</span>`
      }else{
        output = `
        <span class="badge badge-pill badge-primary">${this.defaultBadge}</span>
        `
      }

      document.getElementById('lanBadges').innerHTML = output

    })

  }

  displayRepoStarred(starredRepo){
    let list = [], list2 = [], list3 = [], list4 = []
    starredRepo.forEach(sta =>{
      list.push([sta.id, sta.stargazers_count])
      list3.push(sta)
    })
    list.sort((a,b)=>{
      return b[1] - a[1]
    })
    for(let a=0;a<3;a++){
      list2.push(list[a])
    }
    for(let a=0;a<list3.length;a++){
      for(let b=0;b<list2.length;b++){
        if(list2[b][0] == list3[a]['id']){
          list4.push(list3[a])
        }
      }
    }

    let output;
    if(starredRepo.length !== 0){
      output = `
      <div class="card repo-card pb-3 mb-5">
        <div class="starred">
          <div class="heading">
            <h4 class="text-center">Most Starred Repositories</h4>
          </div>
          <ul class="list-group list-group-flush">`
          list4.forEach(star =>{
            output += `
            <li class="list-group-item">
                <div class="desc">
                  <div class="row">
                    <div class="col-9">
                      <h5 class="mb-0">Repo: ${star.name}</h5>
                      <p>Desc: ${(star.description) ? star.description : this.defaultDesc}</p>
                    </div>
                    <div class="col clone">
                      <a href="${star.clone_url}" class="btn btn-primary cloneBtn text-light">Clone</a>
                    </div>
                  </div>
                </div>
                <div class="badges">
                  <span class="badge badge-primary">
                    Stars <span class="badge badge-light">${star.stargazers_count}</span></span>
                  <span class="badge badge-primary">
                    Forks <span class="badge badge-light">${star.forks}</span></span>
                  <span class="badge badge-primary">
                    Watchers <span class="badge badge-light">${star.watchers}</span>
                  </span>
                  <span class="badge badge-primary">
                    Size <span class="badge badge-light">${star.size}</span>
                  </span>
                  <span class="badge badge-primary">
                    Language <span class="badge badge-light">${star.language}</span>
                  </span>
                  <span class="badge badge-primary">Updated: <span class="badge badge-light"> ${this.getTime(star.created_at)}</span></span>
                </div>
            </li>
            `
          })
           output += `
           </ul>
         </div>
       </div>`

    }else{
      output = `
      <div class="card repo-card pb-3 mb-5">
        <div class="starred">
          <div class="heading">
            <h4 class="text-center">Lastest Repositories</h4>
          </div>
          <h5 class="text-center no-repo">No Repository Found </h5>
      </div>
    </div>`
    }

     this.repoStarred.innerHTML = output
  }


  displayRepoLastest(lastestRepo){
    console.log(lastestRepo)
    let output;
    if(lastestRepo.length !== 0){
      output = `
      <div class="card repo-card pb-3 mb-5">
        <div class="starred">
          <div class="heading">
            <h4 class="text-center">Lastest Repositories</h4>
          </div>
          <ul class="list-group list-group-flush">`
          lastestRepo.forEach(lastest =>{
            output += `
            <li class="list-group-item">
                <div class="desc">
                  <div class="row">
                    <div class="col-9">
                      <h5 class="mb-0">Repo: ${lastest.name}</h5>
                      <p>Desc: ${(lastest.description) ? lastest.description : this.defaultDesc}</p>
                    </div>
                    <div class="col clone">
                      <a href="${lastest.clone_url}" class="btn btn-primary cloneBtn text-light">Clone</a>
                    </div>
                  </div>
                </div>
                <div class="badges">
                  <span class="badge badge-primary">
                    Stars <span class="badge badge-light">${lastest.stargazers_count}</span></span>
                  <span class="badge badge-primary">
                    Forks <span class="badge badge-light">${lastest.forks}</span></span>
                  <span class="badge badge-primary">
                    Watchers <span class="badge badge-light">${lastest.watchers}</span>
                  </span>
                  <span class="badge badge-primary">
                    Size <span class="badge badge-light">${lastest.size}</span>
                  </span>
                  <span class="badge badge-primary">
                    Language <span class="badge badge-light">${lastest.language}</span>
                  </span>
                  <span class="badge badge-primary">Updated: <span class="badge badge-light"> ${this.getTime(lastest.created_at)}</span></span>
                </div>
            </li>
            `
          })
           output += `
           </ul>
         </div>
       </div>`

    }else{
      output = `
      <div class="card repo-card pb-3 mb-5">
        <div class="starred">
          <div class="heading">
            <h4 class="text-center">Lastest Repositories</h4>
          </div>
          <h5 class="text-center no-repo">No Repository Found </h5>
      </div>
    </div>`
    }

     this.repoLastest.innerHTML = output
  }



  showAlert(msg){
    this.clearAlert();
    let div = document.createElement('div');
    div.className = 'alert text-center alert-danger';
    // let span = document.createElement('span');
    // span.className = 'boldSpan';
    // span.innerHTML = spanText

    div.appendChild(document.createTextNode(msg));
    let searchbox = document.querySelector('.profileRepo');
    let mainbody = document.querySelector('.main-body');
    mainbody.insertBefore(div, searchbox);

    setTimeout(()=>{
      document.querySelector('.alert').remove()
    },3000)
  }

  clearAlert(){
    let alert = document.querySelector('.alert');
    if(alert){
      alert.remove()
    }
  }

  clearProfile(){
    this.profile.innerHTML = '';
    this.repoStarred.innerHTML = '';
    this.repoLastest.innerHTML = '';
  }
}
