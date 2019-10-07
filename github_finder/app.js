let github = new Github;
let ui = new UI;

document.getElementById('searchUser').addEventListener('keyup', fetchUser);

 function fetchUser(e){
   let userText = e.target.value
   if(userText !== ''){
    github.getUser(userText)
    .then(data=>{
      if(data.profileData.message == 'Not Found'){
        ui.showAlert(`Opps! Sorry, the user ${userText.toUpperCase()} is not found!`)
      }else{
        ui.displayUser(data.profileData)
         //console.log(data.reposDataStarred[0].stargazers_count)
         ui.displayRepoStarred(data.reposDataStarred)
        ui.displayRepoLastest(data.reposDataLastest)
      }
    })
  }else{
    ui.clearProfile()
  }
}
