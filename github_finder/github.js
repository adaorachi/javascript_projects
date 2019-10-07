class Github{
  constructor(){
    this.client_id = 'a15af3b1fd69eb5b119c';
    this.client_secret = 'e92ffc9b5f63fffce1987735f76f932375385c96';
    this.repos_count = 3;
    this.repos_sort = 'created:asc';
    this.repos_sortStars = 'stars';
    this.repos_order = 'desc'
  }

  async getUser(user){
    let profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    let reposResponseStarred = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    let reposResponseLastest = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    let profileData = await profileResponse.json();
    let reposDataStarred = await reposResponseStarred.json();
    let reposDataLastest = await reposResponseLastest.json()
    return {
      profileData:profileData,
      reposDataStarred:reposDataStarred,
      reposDataLastest:reposDataLastest
    }
  }
}
