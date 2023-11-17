/* Script: Search Query  - Exercise Two (2) */

document.addEventListener('DOMContentLoaded', function () {

    const searchButton = document.getElementById('searchbtn');
    const heroList = document.getElementById('superheroesList');
    const searchInput = document.getElementById('searchInput');  

    searchButton.addEventListener('click', function (event) {

        // Prevent the form from submitting and page refreshing
        event.preventDefault();  

        const searchTerm = searchInput.value.trim();

        // Make an AJAX request to superheroes.php
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {

            if (xhr.readyState === XMLHttpRequest.DONE) 
            {

                if (xhr.status === 200) 
                {

                    // Parse the JSON response
                    const superheroes = JSON.parse(xhr.responseText);

                    // Check if a search term is provided
                    if (searchTerm === '') 
                    {
                        
                        // Display the full list
                        displaySuperheroes(superheroes);

                    } 
                    else 
                    {

                        // Search for a matching superhero
                        const matchingSuperhero = findMatchingSuperhero(superheroes, searchTerm);
                        
                        if (matchingSuperhero) 
                        {

                            // Display information about the matched superhero
                            displaySuperheroInfo(matchingSuperhero);
                        
                        } 
                        else 
                        {

                            // Display "Result not found"
                            heroList.innerHTML = '<li class="not-found">Superhero not found</li>';
                            
                        }
                    
                    }

                } 
                else 
                {

                    // Handle error
                    console.error('Error fetching superheroes:', xhr.status);

                }
            
            }
        
        };

        // Open the request
        xhr.open('GET', 'superheroes.php', true);

        // Send the request
        xhr.send();
    });

    // Update the displaySuperheroes function
    function displaySuperheroes(superheroes) 
    {
    
        // Display the full list of superheroes
        const superheroList = document.getElementById('superheroesList');
        superheroList.innerHTML = ''; // Clear the previous content

        superheroes.forEach(superhero => {

            const superheroItem = document.createElement('li');
            superheroItem.classList.add('superhero-item');
            superheroItem.innerHTML = `<strong>${superhero.alias}</strong> - ${superhero.name}`;
            superheroList.appendChild(superheroItem);

        });
    
    }

    // Update the displaySuperheroInfo function
    function displaySuperheroInfo(superhero) 
    {
    
        // Display information about the matched superhero
        const superheroInfo = document.getElementById('superheroesList');

        superheroInfo.innerHTML = `
            <div class="superhero-info">
                <h1>${superhero.alias}</h2>
                <h2><strong>A.K.A</strong> ${superhero.name}</h2>
                <h4>${superhero.biography}</h4>
            </div>
        `;

    }

    function findMatchingSuperhero(superheroes, searchTerm) 
    {
    
        // Search for a matching superhero by name or alias
        return superheroes.find(superhero => superhero.name.toLowerCase().includes(searchTerm.toLowerCase()) || superhero.alias.toLowerCase().includes(searchTerm.toLowerCase()));
    
    }

});
