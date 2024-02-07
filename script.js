const requestURL = 'http://api.github.com/users/'
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const profileCard = document.querySelector('.profile-card')
const name = document.getElementById('name')
const username = document.getElementById('username')
const avatar = document.getElementById('avatarImg')
const bio = document.getElementById('bio')
const followers = document.getElementById('followers')
const following = document.getElementById('following')
const repo = document.getElementById('repo')
const goToProfile = document.getElementById('goToProfile')
const loading = document.getElementById('loading')
const accountCreated = document.getElementById('accountCreated')
const accountUpdated = document.getElementById('accountUpdated')

function generateProfile(data) {
  profileCard.style.display = 'block';
  document.querySelector('.invalid').style.display = 'none';
  name.innerHTML = data.name;
  username.innerHTML = '@' + data.login;
  avatar.src = data.avatar_url;
  bio.innerHTML = data.bio;
  followers.innerText = data.followers;
  following.innerHTML = data.following;
  repo.innerHTML = data.public_repos
  goToProfile.href = data.html_url
  accountCreated.innerHTML = new Date(data.created_at).toLocaleDateString('en-GB')
  accountUpdated.innerHTML = new Date(data.updated_at).toLocaleDateString('en-GB')
}

const fetchData = async () => {
  const username = searchInput.value.trim();
  loading.innerHTML = 'Loading...';
  if (!username) {
    alert('Please enter a username')
  }
  else {
    try {
      const response = await fetch(requestURL + username)
      const data = await response.json();
      if (data.login === username) {
        console.log(data);
        loading.innerHTML = '';
        generateProfile(data);
      }
      else {
        console.log('user not found')
        document.querySelector('.invalid').style.display = 'block';
        profileCard.style.display = 'none';
        loading.innerHTML = '';
      }


    } catch (error) {
      console.log(error);

    }
  }
}
searchBtn.addEventListener('click', fetchData);