// Game state
const gameState = {
    character: {
        name: '',
        race: '',
        class: '',
        location: '',
        health: 100,
        experience: 0,
        veilEnergy: 50,
        inventory: [],
        abilities: []
    },
    storyHistory: [],
    currentScenario: ''
};

// AI Game Master - simulates AI responses
class GameMaster {
    constructor() {
        this.personalities = {
            'The Shattered Spire': 'mystical and arcane',
            'Ironhold': 'gritty and militaristic', 
            'The Whispering Woods': 'eerie and supernatural',
            'The Ashen Wastes': 'dangerous and apocalyptic'
        };
    }

    generateStory(character, choice = null) {
        const scenarios = this.getScenarios(character, choice);
        return scenarios[Math.floor(Math.random() * scenarios.length)];
    }

    getScenarios(character, choice) {
        const { race, class: charClass, location, name } = character;
        
        if (!choice) {
            // Initial scenarios based on starting location
            switch (location) {
                case 'The Shattered Spire':
                    return [
                        {
                            story: `${name} the ${race} ${charClass} doth manifest within the floating ruins of the Shattered Spire, where ancient magicks crackle through the very air like lightning trapped in stone. Fragments of once-mighty towers drift weightlessly about thee, defying the laws of mortal understanding. The Veil's energy hums with dangerous instability, and in the distance, a crystalline structure pulses with otherworldly light that seems to call to thy very soul. Suddenly, a voice—neither male nor female, neither young nor old—echoes from the void itself: "Another Veilforged arrives at the threshold... but art thou here as friend or foe to the ancient order?"`,
                            choices: [
                                "Approach the crystal structure with sword drawn and ready",
                                "Call out boldly to the mysterious voice in challenge",
                                "Attempt to draw the floating Veil energy into thy being",
                                "Search these cursed ruins for other lost souls"
                            ]
                        }
                    ];
                case 'Ironhold':
                    return [
                        {
                            story: `The very ground trembles beneath ${name}'s boots as great siege engines thunder against the mighty gates of Ironhold, the last bastion of the mountain lords. Thou hast arrived at this dwarven stronghold in its darkest hour, when hope grows thin as mountain air. Arrows whistle overhead like deadly wasps as brave defenders scramble along the battlements. A grizzled dwarf captain, his beard stained with soot and blood, spots thee amongst the chaos and bellows over the din of war: "By the forge-fires! Another warrior comes to our aid! The enemy hath breached the outer walls—we need every blade that can be wielded!"`,
                            choices: [
                                "Take up arms immediately and join the wall's defenders",
                                "Offer to lead the civilians to safety through secret passages",
                                "Volunteer to infiltrate and sabotage the enemy's war machines",
                                "Seek out the ancient dwarven runes that protect this fortress"
                            ]
                        }
                    ];
                case 'The Whispering Woods':
                    return [
                        {
                            story: `${name} steps across the threshold into the Whispering Woods, where mist swirls between ancient oak and ash like the breath of sleeping giants. The forest itself seems alive with supernatural presence—ghostly lights dance between gnarled branches like fallen stars, and voices speak in tongues that were old when the world was young. As thou dost venture deeper into this realm betwixt the living and the dead, the very trees seem to turn their bark-covered faces toward thee in silent judgment. A spectral figure, translucent as morning mist, materializes before thee and gestures with ethereal fingers toward a hidden path that leads deeper into shadow.`,
                            choices: [
                                "Follow the ghostly guide into the deeper mysteries",
                                "Attempt to commune with the ancient whispering voices",
                                "Investigate the source of the dancing spirit-lights",
                                "Search for a forgotten shrine or sacred grove"
                            ]
                        }
                    ];
                case 'The Ashen Wastes':
                    return [
                        {
                            story: `${name} emerges into the desolate Ashen Wastes, where the very air burns with the lingering hatred of demonic forces. The scorched earth cracks beneath thy feet like broken pottery, and in the distance, twisted creatures hunt among the bleached bones of what was once a great battlefield. Here, where heroes fell and darkness claimed victory, a band of ragged scavengers approaches with caution writ large upon their soot-stained faces. One among them, a woman whose eyes have seen too much, calls out in a voice hoarse from breathing cursed air: "Another living soul braves these forsaken lands? Stranger, these wastes are no place for the living—the dead here hunger for warm blood and the demons feast upon hope itself."`,
                            choices: [
                                "Bargain with the scavengers for knowledge of safe passage",
                                "Hunt down a nearby demon to claim its unholy power",
                                "Search the ancient battlefield for legendary artifacts",
                                "Attempt to consecrate and purify this cursed ground"
                            ]
                        }
                    ];
            }
        } else {
            // Generate follow-up scenarios based on player choice
            return this.generateFollowUpScenarios(character, choice);
        }
    }

    generateFollowUpScenarios(character, choice) {
        const outcomes = [
            {
                story: `Thy bold decision doth lead to most unexpected consequences, brave ${character.name}. As a ${character.race} of the ${character.class} calling, thy unique heritage and training reveal hidden opportunities where others would see only danger. The Veil's ancient energy responds to thy presence like a faithful hound to its master, opening pathways through reality that few mortals dare to tread...`,
                choices: [
                    `Channel thy ${character.class} training to uncover deeper mysteries`,
                    "Draw upon thy racial heritage for ancient wisdom",
                    "Trust in the power of the Veil to guide thy steps",
                    "Proceed with the caution of a seasoned adventurer"
                ]
            },
            {
                story: `The path thou hast chosen reveals more of Veilforge's darkest secrets, noble ${character.name}. Ancient magicks stir in response to thy presence, and thou dost sense that thy every action is observed by forces both benevolent and malevolent. Thy journey as a Veilforged hath only just begun, and already the threads of fate begin to weave around thee like a spider's web...`,
                choices: [
                    "Embrace the darker aspects of thy Veil-touched power",
                    "Seek to understand the light that dwells within the Veil",
                    "Strive to balance both shadow and light in thy soul",
                    "Focus thy efforts on mastering practical survival arts"
                ]
            },
            {
                story: `Fortune favors the bold, and thy courage hath not gone unnoticed by the ancient powers that dwell within these lands. As ${character.name} the ${character.race}, thou dost carry within thy blood the memories of ages past, and thy ${character.class} training serves thee well in this moment of trial. The very stones beneath thy feet seem to whisper of long-forgotten heroes who once walked this same path...`,
                choices: [
                    "Listen closely to the whispers of ancient heroes",
                    "Press forward with unwavering determination", 
                    "Search for hidden passages or secret knowledge",
                    "Rally any allies who might aid thy noble cause"
                ]
            }
        ];
        
        return outcomes;
    }
}

const gameMaster = new GameMaster();

// DOM Elements
const startBtn = document.getElementById('start-btn');
const characterCreation = document.getElementById('character-creation');
const gameContent = document.getElementById('game-content');

// Event Listeners
startBtn.addEventListener('click', startAdventure);

// Initialize flame animation
setInterval(() => {
    const flame = document.querySelector('.flame');
    if (flame) {
        flame.style.transform = `scale(${0.9 + Math.random() * 0.2}) rotate(${-3 + Math.random() * 6}deg)`;
    }
}, 500);

// Game Functions
function startAdventure() {
    const race = document.getElementById('race').value;
    const charClass = document.getElementById('class').value;
    const location = document.getElementById('location').value;
    const name = document.getElementById('character-name').value.trim();

    if (!race || !charClass || !location || !name) {
        alert('Pray tell, brave adventurer, thou must complete all details of thy character before beginning this noble quest!');
        return;
    }

    // Set up character
    gameState.character = {
        ...gameState.character,
        name: name,
        race: race,
        class: charClass,
        location: location
    };

    // Hide character creation, show game
    characterCreation.classList.add('hidden');
    gameContent.classList.remove('hidden');

    // Display character info
    updateCharacterInfo();

    // Generate initial story
    generateNextScenario();
}

function updateCharacterInfo() {
    const char = gameState.character;
    document.getElementById('character-details').innerHTML = 
        `<strong>${char.name}</strong> - ${char.race} ${char.class}<br>
         Current Realm: ${char.location}`;
    
    document.getElementById('health').textContent = char.health;
    document.getElementById('experience').textContent = char.experience;
    document.getElementById('veil-energy').textContent = char.veilEnergy;
}

function generateNextScenario(playerChoice = null) {
    showLoading(true);
    
    // Simulate AI thinking time with medieval flair
    setTimeout(() => {
        const scenario = gameMaster.generateStory(gameState.character, playerChoice);
        displayScenario(scenario);
        showLoading(false);
    }, 2500 + Math.random() * 1500);
}

function displayScenario(scenario) {
    document.getElementById('story-content').innerHTML = scenario.story;
    
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    
    scenario.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.innerHTML = `${index + 1}. ${choice}`;
        button.onclick = () => makeChoice(choice);
        choicesDiv.appendChild(button);
    });

    // Randomly update character stats with medieval flavor
    updateStats();
}

function makeChoice(choice) {
    gameState.storyHistory.push(choice);
    generateNextScenario(choice);
}

function updateStats() {
    // Simulate stat changes based on actions with medieval consequences
    const healthChange = Math.floor(Math.random() * 20) - 10;
    const expChange = Math.floor(Math.random() * 15) + 5;
    const veilChange = Math.floor(Math.random() * 20) - 10;

    gameState.character.health = Math.max(0, Math.min(100, gameState.character.health + healthChange));
    gameState.character.experience += expChange;
    gameState.character.veilEnergy = Math.max(0, Math.min(100, gameState.character.veilEnergy + veilChange));

    updateCharacterInfo();
}

function showLoading(show) {
    const loading = document.getElementById('loading');
    const choices = document.getElementById('choices');
    
    if (show) {
        loading.classList.remove('hidden');
        choices.classList.add('hidden');
    } else {
        loading.classList.add('hidden');
        choices.classList.remove('hidden');
    }
}
