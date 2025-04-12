document.getElementById("shareBtn").addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CineCrafter',
          text: 'Check out this on CineCrafter!🍿🎬',
          url: window.location.href  // Shares the current page
        });
        console.log('Sharing successful!');
      } catch (err) {
        console.log('Error while sharing:', err);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  });

function addToWatchlist(id) {
    if(id.className == "fa-regular fa-square-plus"){ 
        id.className = "fa-solid fa-square-check";
        id.style.color = "#BDF71E";
    }
    else if(id.className == "fa-solid fa-square-check"){
        id.className = "fa-regular fa-square-plus";
        id.style.color = "white";
    }
}

function addToBookmark(id) {
    if(id.className == "fa-regular fa-bookmark"){ 
        id.className = "fa-solid fa-bookmark";
        id.style.color = "#BDF71E";
    }
    else if(id.className == "fa-solid fa-bookmark"){
        id.className = "fa-regular fa-bookmark";
        id.style.color = "white";
    }
}
