console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogImageContainer = document.getElementById("dog-image-container");
    const dogBreedsList = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");

    let breeds = {};

    // Function to fetch and display dog images
    function fetchDogImages() {
        fetch(imgUrl)
            .then(response => response.json())
            .then(data => {
                data.message.forEach(imgUrl => {
                    const img = document.createElement("img");
                    img.src = imgUrl;
                    img.alt = "A random dog image";
                    dogImageContainer.appendChild(img);
                });
            })
            .catch(error => {
                console.error("Error fetching dog images:", error);
            });
    }

    // Function to fetch and store dog breeds
    function fetchDogBreeds() {
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                breeds = data.message;
                displayBreeds(Object.keys(breeds));
            })
            .catch(error => {
                console.error("Error fetching dog breeds:", error);
            });
    }

    // Function to display dog breeds
    function displayBreeds(breedList) {
        dogBreedsList.innerHTML = "";
        breedList.forEach(breed => {
            const li = document.createElement("li");
            li.textContent = breed;
            li.addEventListener("click", () => {
                // Change to your preferred color
                li.style.color = "green"; 
            });
            dogBreedsList.appendChild(li);
        });
    }

    // Event listener for breed dropdown
    breedDropdown.addEventListener("change", (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = Object.keys(breeds).filter(breed => 
            selectedLetter === "all" || breed.startsWith(selectedLetter)
        );
        displayBreeds(filteredBreeds);
    });

    // Initial fetches
    fetchDogImages();
    fetchDogBreeds();
});
