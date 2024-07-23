document.addEventListener("DOMContentLoaded", function() {
  const toggleButton = document.getElementById("toggleButton");
  const toggleContent = document.getElementById("toggleContent");
  const taskList = document.querySelector(".task-list");
  const toggleHeading = document.getElementById("toggle-heading")
  const collapsedContent = document.querySelector(".collapsed-content");
  const taskTitle = document.getElementById("task-title");
  const taskDescription = document.getElementById("task-description");
  const assetsTitle = document.getElementById("assets-title");

  let isExpanded = false;

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const task = data.tasks[0];
      const content = task.assets.map(asset => `<li>${asset.asset_title}</li>`).join('');
      taskList.innerHTML = content;
      taskTitle.textContent = task.task_title;
      taskDescription.textContent = task.task_description;
      assetsTitle.textContent = task.assets.length > 0 ? task.assets[0].asset_title : '';

    })
    .catch(error => console.error('Error fetching data:', error));

  toggleButton.addEventListener("click", function() {
    if (isExpanded) {
      document.querySelector(".toggle-container").style.width = "150px";
      toggleContent.style.display = "none";
      collapsedContent.style.display = "flex";
      toggleButton.querySelector("i").classList.replace("fa-arrow-circle-left", "fa-arrow-circle-right");
      toggleHeading.style.display = "none";
      toggleButton.style.justifyContent = "end";
    } else {
      document.querySelector(".toggle-container").style.width = "390px";
      toggleContent.style.display = "flex";
      collapsedContent.style.display = "none";
      toggleButton.querySelector("i").classList.replace("fa-arrow-circle-right", "fa-arrow-circle-left");
      toggleHeading.style.display = "block";
      toggleButton.style.justifyContent = "space-between";

      fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const content = data.tasks.map(task => {
          const assets = task.assets.map(asset => `<li>${asset.asset_title}</li>`).join('');
          return `<li><strong>${task.task_title}</strong><ul>${assets}</ul></li>`;
        }).join('');
        taskList.innerHTML = content;
      })
      .catch(error => console.error('Error fetching data:', error));
  }
    isExpanded = !isExpanded;
  });
});

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const boxesContainer = document.getElementById('boxes-container');


        boxesContainer.innerHTML = '';

        const task = data.tasks[0];
        const assets = task.assets;

        const numBoxes = Math.min(assets.length, 4); 

        for (let i = 0; i < numBoxes; i++) {
            const asset = assets[i];
            const box = document.createElement('div');
            box.className = 'box';

            let assetContent = '';
            if (i === 0 && asset.asset_content.includes('youtube.com/embed')) {
                assetContent = `<iframe src="${asset.asset_content}" frameborder="0" allowfullscreen></iframe>`;
            } else {
                assetContent = asset.asset_content;
            }

            let thread = "";
            if(i === 1){
              thread = `<div class="thread">
                          <div><i class="fa fa-chevron-up" style="font-size: 20px ; color: black;"></i></div>
                          <div>Thread A</div>
                        </div>`
            }

            let additionalInputs = '';
            if (i === 1) {
                additionalInputs = `
                  <div class="input-boxes">
                      <div class="input-box">
                          <div class="sub-thread">Sub thread 1</div>
                          <div class="input-thread"><input placeholder="Enter Text"></div>
                      </div>
                      <div class="input-box">
                          <div class="sub-thread">Sub thread 2</div>
                          <div class="input-thread"><input placeholder="Enter Text"></div>
                      </div>
                  </div>    
                `;
            }

            let icons = "";
            if(i === 1){
              icons = `<div class="icons-groups">
                          <i class="fa fa-bell" style="font-size: 14px; color: black;"></i>
                          <i class="fa fa-envelope" style="font-size: 14px; color: black;"></i>
                          <i class="fa fa-address-card" style="font-size: 14px; color: black;"></i>
                          <i class="fa fa-rebel" style="font-size: 14px; color: black;"></i>
                          <div class="dropdown-menu">
                            Select Categ
                            <i class="fa fa-chevron-down" style="font-size: 15px; color: black;"></i>
                          </div>
                          <div class="dropdown-menu">
                            Select Proces
                            <i class="fa fa-chevron-down" style="font-size: 15px; color: black;"></i>
                          </div>
                      </div>`
            }

            let summary = "";
            if( i === 1 ){
              summary = `<div class="summary">
                            <div class="summary-box">
                                <div class="summary-thread">Enter summary of thread A</div>
                                <div class="summary-input"><input placeholder="Enter Text"></div>
                            </div>
                        </div>`
            }

            let title = "";
            if( i === 2 ){
              title = `<div class="title">
                          <p>Title</p>
                          <div class="title-box"><input></div>
                          <div class="content-box">
                            <p>Content</p>
                            <div class="content-option">
                              <ul>
                                <li>File</li>
                                <li>Edit</li>
                                <li>View</li>
                                <li>Insert</li>
                                <li>Format</li>
                                <li>Tools</li>
                                <li>Tables</li>
                                <li>Help</li>
                              </ul>
                            </div>
                            <div class="content-input"><input></div>
                          </div>
                      </div>`
            }

            let intro = "";
            if( i === 3 ){
              intro = `
                      <div>
                        <div class="intro">
                          <div><i class="fa fa-chevron-up" style="font-size: 20px ; color: black;"></i></div>
                          <div>Introduction</div>
                        </div>
                        <div class="intro-container">
                          <p>The 4SA Method , How to bring a idea into progress ?</p>
                          <button class="see-more-btn">See more</button>
                        </div>
                        <div class="thread-A">
                          <i class="fa fa-chevron-up" style="font-size: 20px ; color: black;"></i>
                          <p>Thread A</p>
                        </div>
                        <div class="text-wrapper">
                          <p>How are you going to develop your stratergy ? Which method are you going to use to develop a stratergy ? What if the project is lengthy?</p>
                          <button class="see-more-btn">See more</button>  
                        </div>
                        <div class="intro-example">
                          <p>Example</p>
                        </div>
                        <p class="text">You have a concept , How will you put into progress?</p>
                      </div>  
                        `
            }


            box.innerHTML = `
                <div class="box-container">
                    <div class="content-box">
                        <div class="project-title">${asset.asset_title}
                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                        </div>
                        <div class="project-description"><strong>Description:</strong> ${asset.asset_description}</div>
                        <div class="project-content">${assetContent}</div>
                        ${thread}
                        ${additionalInputs}
                        ${icons}
                        ${summary}
                        ${title}
                        ${intro}
                    </div>
                </div>
            `;


            boxesContainer.appendChild(box);
        }
    })
    .catch(error => console.error('Error fetching data:', error));



