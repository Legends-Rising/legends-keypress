// html/script.js

const possibleKeys = ['A', 'S', 'D', 'W', 'E', 'R']; // Possible random keys
let totalKeysRequired = 10; // Total number of correct key presses required
let totalTime = 5; // Total time in seconds
let timer = totalTime;
let keyPressCount = 0;
let currentKey;
let interval;

const minigameUI = document.getElementById('minigame-ui'); // Parent container
const keyDisplay = document.getElementById('key-display');
const timerDisplay = document.getElementById('timer');
const statusMessage = document.getElementById('status-message');
const circle = document.querySelector('.progress-ring__circle');
const minigameContainer = document.querySelector('.minigame-container');
const circumference = 2 * Math.PI * 55;
circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function playSound(soundName, soundSet) {
    fetch(`https://${GetParentResourceName()}/playsound`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ soundName: soundName, soundSet: soundSet })
    });
}

function startGame() {
    timer = totalTime;
    keyPressCount = 0;
    generateRandomKey();
    playSound("SELECT", "RDRO_Character_Creator_Sounds"); // Play start sound
    interval = setInterval(updateProgress, 1000);
    minigameUI.classList.remove('hidden'); // Show the UI
}

function endGame() {
    // Hide the UI after a short delay to allow users to see the result
    setTimeout(() => {
        minigameUI.classList.add('hidden');
        // Reset UI elements for next game
        resetUI();
    }, 2000); // 2 seconds delay; adjust as needed
}

function generateRandomKey() {
    currentKey = possibleKeys[Math.floor(Math.random() * possibleKeys.length)];
    keyDisplay.textContent = `${currentKey}`;
    keyDisplay.classList.remove('success', 'fail');
    repositionUI(); // Reposition UI when a new key is generated
}

function updateProgress() {
    if (timer <= 0) {
        clearInterval(interval);
        failAnimation();
    } else {
        timer--;
        const offset = circumference - (circumference / totalTime) * (totalTime - timer);
        circle.style.strokeDashoffset = offset;
        // Removed updateTimerDisplay();
    }
}

function successAnimation() {
    keyDisplay.innerHTML = '<img src="assets/menu_icon_tick.png" alt="Success" style="width:  80%; height: 80%;">'; // Display success image
    keyDisplay.classList.add('success');
    statusMessage.textContent = 'Success!';
    statusMessage.classList.add('success');
    minigameContainer.classList.add('success');
    circle.style.stroke = '#28a745';
    statusMessage.style.display = 'none';
    sendResult(true);
    endGame();
}

function failAnimation() {
    keyDisplay.innerHTML = '<img src="assets/cross.png" alt="fail" style="width: 80%; height: 80%;">'; // Display fail image
    keyDisplay.classList.add('fail');
    statusMessage.textContent = 'Failed!';
    statusMessage.classList.add('fail');
    minigameContainer.classList.add('fail');
    circle.style.stroke = '#d9534f';
    circle.style.strokeDashoffset = circumference;
    statusMessage.style.display = 'none';
    sendResult(false);
    endGame();
}

function repositionUI() {
    const container = document.querySelector('.minigame-container');

    container.style.visibility = 'hidden';
    container.style.display = 'block'; 
    const rect = container.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;
    container.style.visibility = '';
    container.style.display = '';

    const padding = 20; // Padding from the edges

    
    const maxX = window.innerWidth - containerWidth - padding;
    const maxY = window.innerHeight - containerHeight - padding;

    
    const safeMaxX = Math.max(maxX, padding);
    const safeMaxY = Math.max(maxY, padding);

  
    const randomX = Math.floor(Math.random() * (safeMaxX - padding + 1)) + padding;
    const randomY = Math.floor(Math.random() * (safeMaxY - padding + 1)) + padding;

    
    container.style.position = 'fixed';
    container.style.left = `${randomX}px`;
    container.style.top = `${randomY}px`;

   
    container.classList.add('animate-fade-in-scale');

   
    setTimeout(() => {
        container.classList.remove('animate-fade-in-scale');
    }, 500); 
}


function triggerKeyPressEffect() {
    keyDisplay.classList.add('pressed');
    setTimeout(() => {
        keyDisplay.classList.remove('pressed');
    }, 200);
}

function resetUI() {
    // Reset all UI elements to their default state
    circle.style.stroke = '#ffffff';
    circle.style.strokeDashoffset = `${circumference}`;
    minigameContainer.classList.remove('success', 'fail');
    statusMessage.classList.remove('success', 'fail');
    statusMessage.style.display = 'none';
    // Reset key display to default if needed
    if (currentKey) {
        keyDisplay.textContent = `${currentKey}`;
    } else {
        keyDisplay.textContent = `Press 'E'`;
    }
}

function sendResult(success) {
    // Send the result back to Lua
    fetch(`https://${GetParentResourceName()}/minigameResult`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ success: success })
    }).then(resp => resp.json()).then(resp => {
        // Handle any response if needed
    }).catch(err => {
        console.error('Error sending minigame result:', err);
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key.toUpperCase() === currentKey) {
        keyPressCount++;
        playSound("NAV_LEFT", "PAUSE_MENU_SOUNDSET"); // Play key press sound
        if (keyPressCount >= totalKeysRequired) {
            clearInterval(interval);
            successAnimation();
            circle.style.strokeDashoffset = 0;
        } else {
            generateRandomKey(); // Generate a new key after each correct press
            triggerKeyPressEffect(); // Trigger visual effect on correct key press
        }
    } else {
        // Wrong key pressed - fail the game
        clearInterval(interval);
        playSound("SELECT", "RDRO_Character_Creator_Sounds"); // Play start sound
        failAnimation();
    }
});

// Listen for messages from Lua to start the minigame
window.addEventListener('message', function(event) {
    const data = event.data;
    if (data.action === 'startMinigame') {
        // Set the total time and keys required based on data
        totalTime = data.totalTime;
        totalKeysRequired = data.totalKeysRequired;
        // Reset UI elements
        resetUI();
        // Start the game
        startGame();
    }
});
