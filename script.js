async function handleSearch() {
    const username = document.getElementById('username').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  
    try {
      const response = await fetch(`http://localhost:3000/find-collaborators/${username}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const collaborators = await response.json();
  
      collaborators.forEach(collaborator => {
        const collaboratorElement = document.createElement('div');
        collaboratorElement.classList.add('result-item');
  
        const avatar = document.createElement('img');
        avatar.src = collaborator.avatar_url;
        avatar.alt = collaborator.login;
  
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('result-info');
  
        const name = document.createElement('h3');
        name.textContent = collaborator.login;
  
        const link = document.createElement('p');
        const anchor = document.createElement('a');
        anchor.href = collaborator.html_url;
        anchor.textContent = collaborator.html_url;
        anchor.target = '_blank';
        link.appendChild(anchor);
  
        infoDiv.appendChild(name);
        infoDiv.appendChild(link);
        collaboratorElement.appendChild(avatar);
        collaboratorElement.appendChild(infoDiv);
        resultsDiv.appendChild(collaboratorElement);
      });
    } catch (error) {
      console.error('Error fetching collaborators:', error);
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Failed to fetch collaborators. Please try again later.';
      resultsDiv.appendChild(errorMessage);
    }
  }
  