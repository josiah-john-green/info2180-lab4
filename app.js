/*Script - Search Request : Exercise (1)*/

document.addEventListener('DOMContentLoaded', function () {

    const searchButton = document.getElementById('searchbtn');

    searchButton.addEventListener('click', function () {

        // Make an AJAX request
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {

            if (xhr.readyState === XMLHttpRequest.DONE) 
            {

                if (xhr.status === 200) 
                {

                    // Display names in a pop-up
                    alert('Superhero Names:\n' + xhr.responseText);

                } 
                else 
                {
                    
                    alert('Error fetching superheroes');
                }
            
            }
        
        };

        xhr.open('GET', 'superheroes.php', true);
        
        xhr.send();
    
    });

});
