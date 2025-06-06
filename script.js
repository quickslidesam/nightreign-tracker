// Test Response
function testResponse() {
    alert("Responsive!");
};

 // Character Data
const characters = [
    {
        name:"WYLDER",
        image:"https://eldenringnightreign.wiki.fextralife.com/file/Elden-Ring-Nightreign/wylder1-nightfarer-elden-ring-nightreign-wiki-guide.png"
    },
    {
        name:"GUARDIAN",
        image:"https://eldenringnightreign.wiki.fextralife.com/file/Elden-Ring-Nightreign/guardian1-nightfarer-elden-ring-nightreign-wiki-guide.png"
    },
    {
        name:"IRONEYE",
        image:"https://eldenringnightreign.wiki.fextralife.com/file/Elden-Ring-Nightreign/ironeye1-nightfarer-elden-ring-nightreign-wiki-guide.png"
    },
    {
        name:"DUCHESS",
        image:"https://eldenringnightreign.wiki.fextralife.com/file/Elden-Ring-Nightreign/duchess1-nightfarer-elden-ring-nightreign-wiki-guide.png"
    },
    {
        name:"RAIDER",
        image:"https://eldenringnightreign.wiki.fextralife.com/file/XElden-Ring-Nightreign/raider1-nightfarer-elden-ring-nightreign-wiki-guide.png"
    },
    {
        name:"REVENANT",
        image:"https://eldenringnightreign.wiki.fextralife.com/file/Elden-Ring-Nightreign/revenant1-nightfarer-elden-ring-nightreign-wiki-guide.png"
    },
    {
        name:"RECLUSE",
        image:"https://eldenringnightreign.wiki.fextralife.com/file/Elden-Ring-Nightreign/recluse1-nightfarer-elden-ring-nightreign-wiki-guide.png"
    },
    {
        name:"EXECUTOR",
        image:"https://eldenringnightreign.wiki.fextralife.com/file/Elden-Ring-Nightreign/executor1-nightfarer-elden-ring-nightreign-wiki-guide.png"
    },
]

// Completion Data
let completionData = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: []
}

const savedData = localStorage.getItem('completionData');
if (savedData) {
    completionData = JSON.parse(savedData)
}

// Character Index Functions
let characterIndex = 0;

function increaseIndex() {
    if(characterIndex >= 7) {
        characterIndex = 0
    } else {
        characterIndex++
    };
    updateCharacter();
};

function decreaseIndex() {
    if(characterIndex <= 0) {
        characterIndex = 7
    } else {
        characterIndex--
    };
    updateCharacter();
};

function updateCharacter() {
    const character = characters[characterIndex];
    document.getElementById('class-name').textContent = character.name;
    document.querySelector('.character-image img').src = character.image;

    updateBossCompletionUI();
}

function updateBossCompletionUI() {
    const completed = completionData[characterIndex];

    bossImages.forEach((img) => {
        const bossIndex = parseInt(img.dataset.bossIndex);

        if(completed.includes(bossIndex)) {
            img.classList.add('completed');
        } else {
            img.classList.remove('completed');
        }
    });
}

// Button Click Events
let prevButton = document.getElementById('prev-character')
let nextButton = document.getElementById('next-character')

prevButton.onclick = decreaseIndex;
nextButton.onclick = increaseIndex;


// Boss Image Toggle
const bossImages = document.querySelectorAll('.boss-container');

bossImages.forEach((img) => {
    img.addEventListener('click', () => {
        const bossIndex = parseInt(img.dataset.bossIndex);
        const completed = completionData[characterIndex];

        const indexInCompleted = completed.indexOf(bossIndex);

        if (indexInCompleted === -1) {
            completed.push(bossIndex);
            img.classList.add('completed');
        } else {
            completed.splice(indexInCompleted, 1);
            img.classList.remove('completed');
        }

        localStorage.setItem('completionData', JSON.stringify(completionData));
    });
});

updateCharacter();