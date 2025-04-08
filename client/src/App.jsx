import { useState, useEffect, useRef } from "react";
import keypressSound from "./assets/keypressSound.mp3";

function App() {
  // Sample texts for different difficulty levels
  const sampleTexts = {
    easy: [
      "The sun is bright today.",
      "I like to eat apples.",
      "She walks to school every morning.",
      "Dogs are friendly animals.",
      "The book is on the table.",
      "He plays soccer with his friends.",
      "We went to the park yesterday.",
      "The cat sleeps on the couch.",
      "My mom cooks delicious food.",
      "The sky is blue and clear.",
      "They watch movies on weekends.",
      "I drink water every hour.",
      "The baby laughs happily.",
      "Flowers bloom in spring.",
      "She writes in her diary daily.",
      "Birds sing early in the morning.",
      "He rides his bike to work.",
      "The teacher explains the lesson well.",
      "We buy groceries every Sunday.",
      "The phone rings loudly.",
      "Children play in the yard.",
      "The train arrives on time.",
      "I wear a jacket when it's cold.",
      "She listens to music while studying.",
      "The dog barks at strangers.",
      "He reads the newspaper every day.",
      "The moon shines at night.",
      "We eat dinner at seven.",
      "The car stops at the red light.",
      "She draws pictures in her notebook.",
      "The clock ticks every second.",
      "I wash my hands before eating.",
      "The rain falls softly.",
      "He fixes broken toys.",
      "The baby crawls on the floor.",
      "We visit our grandparents often.",
      "The fish swims in the tank.",
      "She brushes her teeth twice a day.",
      "The wind blows the leaves.",
      "I tie my shoes carefully.",
      "The bus stops at every station.",
      "He waters the plants daily.",
      "The chair is made of wood.",
      "She folds her clothes neatly.",
      "The snow covers the ground.",
      "I write my name on the paper.",
      "The door opens slowly.",
      "He carries a heavy bag.",
      "The light turns green.",
      "She waves goodbye to her friend.",
    ],
    medium: [
      "The sun is bright, & the sky is clear.",
      "I like apples, but she prefers oranges.",
      "She walks to school; however, it's far.",
      "Dogs are friendly, yet some bark loudly.",
      "The book is on the table, & it's thick.",
      "He plays soccer, & he's very good.",
      "We went to the park; it was fun!",
      "The cat sleeps on the couch—it's lazy.",
      "My mom cooks well, & we love it.",
      "The sky is blue; the clouds are white.",
      "They watch movies, & they eat popcorn.",
      "I drink water, but sometimes I prefer juice.",
      "The baby laughs; it's adorable!",
      "Flowers bloom spring is beautiful.",
      "She writes daily; her diary is full.",
      "Birds sing mornings are peaceful.",
      "He rides his bike; it's good exercise.",
      "The teacher explains well, & we understand.",
      "We buy groceries; the fridge is full.",
      "The phone rings it's annoying sometimes.",
      "Children play; their laughter is loud.",
      "The train arrives it's always late.",
      "I wear a jacket; winter is cold.",
      "She listens to music it helps her focus.",
      "The dog barks; the neighbors complain.",
      "He reads the newspaper it's a habit.",
      "The moon shines; nights are bright.",
      "We eat dinner; the food is delicious.",
      "The car stops the light is red.",
      "She draws pictures; they're creative.",
      "The clock ticks time passes quickly.",
      "I wash my hands; hygiene is important.",
      "The rain falls it's soothing.",
      "He fixes toys; kids love him.",
      "The baby crawls it's learning.",
      "We visit grandparents; they're kind.",
      "The fish swims the tank is clean.",
      "She brushes her teeth; her smile is bright.",
      "The wind blows leaves fly everywhere.",
      "I tie my shoes; they come undone often.",
      "The bus stops people get on and off.",
      "He waters plants; they grow fast.",
      "The chair is wooden; it's sturdy.",
      "She folds clothes; her room is tidy.",
      "The snow covers everything is white.",
      "I write my name; it's legible.",
      "The door opens someone is coming.",
      "He carries a bag; it's heavy.",
      "The light turns green; cars move.",
    ],
    hard: [
      "The sun's radiance is scintillating dazzling & intense!",
      "I relish apples; however, she eschews them categorically.",
      "She ambulates to school, albeit the distance is considerable.",
      "Canines are amicable, notwithstanding their vociferousness.",
      "The tome rests upon the table its contents are arcane.",
      "He engages in soccer; his prowess is unparalleled!",
      "We sojourned to the park; the ambiance was idyllic.",
      "The feline slumbers on the divan indolence personified.",
      "My mother's culinary skills are sublime; we're enraptured.",
      "The firmament is cerulean; the cumuli are diaphanous.",
      "They peruse films their proclivity is insatiable!",
      "I imbibe aqua vitae, though occasionally I opt for nectar.",
      "The infant chortles its mirth is contagious!",
      "Flora burgeons; vernal splendor is manifest.",
      "She inscribes daily her journal is voluminous.",
      "Avians carol matutinal serenity prevails.",
      "He cycles to work it's an efficacious regimen.",
      "The pedagogue elucidates; comprehension is instantaneous.",
      "We procure comestibles; our larder is replete.",
      "The telephone clamors its timbre is strident.",
      "Juveniles frolic; their cacophony is deafening.",
      "The locomotive arrives its punctuality is dubious.",
      "I don a parka; boreal climes are gelid.",
      "She audits melodies it augments her concentration.",
      "The hound bays; the vicinity is perturbed.",
      "He peruses the gazette it's an entrenched custom.",
      "The lunar orb gleams; nocturnal luminosity ensues.",
      "We dine; the repast is ambrosial.",
      "The automobile halts the signal is crimson.",
      "She sketches; her oeuvre is avantgarde.",
      "The horologe ticks temporal flux is inexorable.",
      "I cleanse my digits; sanitation is paramount.",
      "Precipitation descends its cadence is mellifluous.",
      "He mends playthings; puerile adoration abounds.",
      "The neonate crawls ontogenesis is evident.",
      "We frequent our progenitors their benevolence is boundless.",
      "The pisces navigates the aquarium is immaculate.",
      "She scrubs her dentition; her grin is incandescent.",
      "The zephyr gusts foliage is dispersed chaotically.",
      "I fasten my footwear their integrity is ephemeral.",
      "The omnibus pauses commuters embark and disembark.",
      "He irrigates flora; their growth is exponential.",
      "The seat is ligneous its durability is commendable.",
      "She arranges garments her quarters are immaculate.",
      "The nival blanket envelops terra is albescent.",
      "I transcribe my nom de plume its legibility is unimpeachable.",
      "The portal ajar an arrival is imminent.",
      "He bears a satchel; its mass is considerable.",
      "The beacon transitions to viridescent traffic progresses.",
    ],
  };

  // Timer options
  const timerOptions = [30, 45, 60, 120];

  // Difficulty options
  const difficultyOptions = ["easy", "medium", "hard"];

  // Static states for UI display only
  const [difficulty, setDifficulty] = useState("medium");
  const [selectedTime, setSelectedTime] = useState(30);
  const [currentText, setCurrentText] = useState(sampleTexts.medium[0]);
  const [userInput, setUserInput] = useState("");
  const [timer, setTimer] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [displayText, setDisplayText] = useState(sampleTexts.medium[0]);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [soundEffectsVolume, setSoundEffectsVolume] = useState(0.5);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [customText, setCustomText] = useState("");
  const [customTextVisible, setCustomTextVisible] = useState(false);


  // Refs to store history of typed and target text
  const typedHistoryRef = useRef("");
  const targetHistoryRef = useRef("");
  const timerIntervalRef = useRef(null);
  const userInputRef = useRef("");

  const keypressAudio = new Audio(keypressSound);
  keypressAudio.volume = soundEffectsVolume;

  // Effect to set the volume of the audio
  const playSound = () => {
    if (soundEnabled) {
      keypressAudio.play();
    }
  };

  // Function to toggle sound
  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  // Function to reset the test
  const resetTest = () => {
    setCustomTextVisible(false);
    setCustomText("");
    setTimer(0);
    setIsPaused(false);
    setIsActive(false);
    setTestCompleted(false);
    setUserInput("");
    setWpm(0);
    setAccuracy(100);
    renderText(difficulty);
  };

  // Effect to set the initial text based on difficulty
  useEffect(() => {
    const textsForLevel = sampleTexts[difficulty];
    const randomIndex = Math.floor(Math.random() * textsForLevel.length);
    const randomText = textsForLevel[randomIndex];
    setCurrentText(randomText);
    setDisplayText(randomText);
  }, [difficulty]);

  // Function to render text whenever needed
  const renderText = (level) => {
    const textsForLevel = sampleTexts[level];
    const randomIndex = Math.floor(Math.random() * textsForLevel.length);
    const randomText = textsForLevel[randomIndex];
    setCurrentText(randomText);
    setDisplayText(randomText);
  };

  // Effect to format the text based on user input
  useEffect(() => {
    if (!currentText) return;

    // Format the text with proper colors
    const formattedText = currentText.split("").map((char, index) => {
      let className = "";

      // Compare with user input to highlight correctly/incorrectly typed characters
      if (index < userInput.length) {
        className =
          userInput[index] === char
            ? "text-green-600"
            : "text-red-600 bg-red-100";
      }

      // Highlight current position
      if (index === userInput.length) {
        className += " border-b-2 border-blue-500";
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });

    setDisplayText(formattedText);
  }, [userInput, currentText]);

  // Code to handle difficulty change
  const DifficultyHandler = (level) => {
    setDifficulty(level);
    resetTest();
  };

  // Code to handle timer change
  const TimeHandler = (time) => {
    setSelectedTime(time);
  };

  // Code to start the timer
  const startTimer = () => {
    setIsActive(true);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    timerIntervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer + 1 >= selectedTime) {
          endTest();
          return selectedTime;
        }
        return prevTimer + 1;
      });
    }, 1000);
  };

  // Code to pause and resume the timer
  const pauseTimer = () => {
    clearInterval(timerIntervalRef.current);
    setIsPaused(true);
  };

  // Code to resume the timer
  const resumeTimer = () => {
    setIsPaused(false);
    startTimer();
  };

  // Code to end the test
  const endTest = () => {
    const finalUserInput = userInputRef.current;
    const finalCurrentText = currentText;

    // Save to history strings if there's current input
    if (finalUserInput.length > 0) {
      typedHistoryRef.current = typedHistoryRef.current + finalUserInput;
      targetHistoryRef.current =
        targetHistoryRef.current +
        finalCurrentText.slice(0, finalUserInput.length);
    }

    const user = typedHistoryRef.current;
    const target = targetHistoryRef.current;

    calculateFinalResult(user, target);

    clearInterval(timerIntervalRef.current);
    typedHistoryRef.current = "";
    targetHistoryRef.current = "";
    setIsActive(false);
    setTestCompleted(true);
    setIsPaused(false);
  };

  // Function to calculate WPM and accuracy
  const calculateFinalResult = (user, target) => {
    let correctChars = 0;
    let incorrectChars = 0;
    let totalChars = 0;
    for (let i = 0; i < user.length; i++) {
      totalChars++;
      if (user[i] === target[i]) {
        correctChars++;
      } else {
        incorrectChars++;
      }
    }
    const totalWords = totalChars / 5;
    const accuracy = (correctChars / totalChars) * 100;
    const timeInSeconds = timer || selectedTime;
    const wpm = Math.floor((totalWords / timeInSeconds) * 60);

    setWpm(Math.floor(wpm));
    setAccuracy(Math.floor(accuracy));
  };

  // Code to handle input change
  const handleInputChange = (event) => {
    if (testCompleted || isPaused) return;
    const value = event.target.value;
    setUserInput(value);

    playSound();

    if (value.length > 0 && !isActive) {
      startTimer();
    }
    userInputRef.current = value;

    if (customTextVisible) {
      if (value.length >= currentText.length) {
        endTest();
      }
    }

    if (value.length >= currentText.length) {
      typedHistoryRef.current = typedHistoryRef.current + value;
      targetHistoryRef.current = targetHistoryRef.current + currentText;

      // Reset current input and get a new text
      setUserInput("");
      userInputRef.current = "";
      renderText(difficulty);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        {/* Header with logo */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-3 md:space-y-0 md:space-x-6">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-3 rounded-full mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Typing Speed Test
              </span>
            </h1>
          </div>

          {/* Sound toggle and volume control */}
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
            {/* Sound toggle button */}
            <button
              onClick={toggleSound}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                soundEnabled
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-600 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {soundEnabled ? "Sound: On" : "Sound: Off"}
            </button>

            {/* Volume control slider */}
            {soundEnabled && (
              <div className="flex items-center space-x-3">
                <label htmlFor="volume" className="text-gray-300 text-sm">
                  Volume:
                </label>
                <input
                  id="volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={soundEffectsVolume}
                  onChange={(e) =>
                    setSoundEffectsVolume(parseFloat(e.target.value))
                  }
                  className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Custom Text Practice Toggle */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-300">
            Custom Text Practice
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCustomTextVisible((prev) => !prev)}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                customTextVisible
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-600 text-gray-300 hover:bg-gray-700"
              }`}
              disabled={isActive && !testCompleted}
            >
              {customTextVisible ? "Custom Text: On" : "Custom Text: Off"}
            </button>
          </div>
        </div>

        {/* Custom Text Input */}
        {customTextVisible && (
          <div className="mb-6">
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full p-4 border-2 border-gray-600 rounded-lg text-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
              placeholder="Enter your custom text here..."
              rows="4"
              disabled={isActive && !testCompleted}
            ></textarea>
            <button
              onClick={() => {
                if (customText.trim()) {
                  setCurrentText(customText);
                  setDisplayText(customText);
                }
              }}
              className="mt-3 py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
              disabled={isActive && !testCompleted}
            >
              Use Custom Text
            </button>
          </div>
        )}

        {/* Difficulty and Timer Selection */}
        {!customTextVisible && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-300">
              Difficulty Level
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {difficultyOptions.map((level) => (
                <button
                  key={level}
                  className={`py-2 px-3 rounded-md capitalize text-sm font-medium transition-all duration-200 ${
                    difficulty === level
                      ? level === "easy"
                        ? "bg-green-600 text-white shadow-md"
                        : level === "medium"
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-red-600 text-white shadow-md"
                      : "bg-gray-700 text-gray-300 border border-gray-600 hover:border-blue-500"
                  }`}
                  onClick={() => {
                    DifficultyHandler(level);
                  }}
                  disabled={isActive && !testCompleted}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Timer selection */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-300">
            Test Duration
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {timerOptions.map((time) => (
              <button
                key={time}
                className={`py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedTime === time
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-700 text-gray-300 border border-gray-600 hover:border-blue-500"
                }`}
                onClick={() => {
                  TimeHandler(time);
                }}
                disabled={isActive && !testCompleted}
              >
                {time}s
              </button>
            ))}
          </div>
        </div>

        {/* Timer display */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg bg-gray-700 px-5 py-2 rounded-lg border border-gray-600 shadow-sm flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-blue-400 font-bold text-2xl">{timer}</span>
            <span className="text-gray-400 ml-1">/ {selectedTime}s</span>
          </div>

          {/* Control buttons */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-3 md:space-y-0 md:space-x-6">
            <button
              className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 shadow-md flex items-center"
              onClick={() => resetTest()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset Test
            </button>

            {isActive && !testCompleted && (
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <button
                  className={`py-2 px-4 rounded-md flex items-center ${
                    isPaused
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-yellow-600 hover:bg-yellow-700"
                  } text-white font-medium transition duration-200 shadow-sm`}
                  onClick={() => (isPaused ? resumeTimer() : pauseTimer())}
                >
                  {isPaused ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                      </svg>
                      Resume
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Pause
                    </>
                  )}
                </button>
                <button
                  className="py-2 px-4 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition duration-200 shadow-sm flex items-center"
                  onClick={() => endTest()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Stop
                </button>
              </div>
            )}
          </div>
        </div>

        {isPaused && (
          <div
            className="text-center bg-yellow-900 bg-opacity-30 text-yellow-400 p-3 rounded-lg mb-4 cursor-pointer border border-yellow-700 shadow-sm"
            onClick={() => resumeTimer()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Test paused. Click here or press Resume to continue.
          </div>
        )}

        {/* Text to type */}
        <div className="mb-4 p-6 bg-gray-700 rounded-lg border border-gray-600 shadow-sm text-lg leading-relaxed min-h-[120px] overflow-y-auto text-gray-200">
          {displayText}
        </div>

        {/* User input */}
        <div className="mb-6">
          <textarea
            value={userInput}
            onChange={handleInputChange}
            onPaste={(e) => e.preventDefault()}
            className="w-full p-6 border-2 border-gray-600 rounded-lg text-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
            placeholder="Start typing here..."
            rows="4"
            disabled={testCompleted || isPaused}
          ></textarea>
        </div>

        {/* Results */}
        {testCompleted && (
          <div className="mb-6 rounded-lg overflow-hidden transition-all duration-300">
            <div className="bg-blue-800 text-white px-6 py-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-bold">Test Completed!</h3>
            </div>

            <div className="p-6 bg-gradient-to-b from-blue-900 to-gray-800 border-l border-r border-b border-blue-700">
              <div className="flex flex-wrap justify-around gap-4 mb-5">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">{wpm}</div>
                  <div className="text-sm text-gray-400 font-medium">WPM</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">
                    {accuracy}%
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    Accuracy
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 mb-4">
                <p className="text-blue-400 font-medium mb-1">
                  {wpm < 30
                    ? "Try to focus on accuracy rather than speed at first."
                    : wpm < 60
                    ? "Good progress! Try to maintain a steady rhythm while typing."
                    : "Excellent speed! Work on maintaining this pace with perfect accuracy."}
                </p>
                <p className="text-gray-400 text-sm">
                  {accuracy < 80
                    ? "Tip: Take your time. Speed comes with practice."
                    : accuracy < 95
                    ? "Tip: Look ahead as you type to prepare for upcoming words."
                    : "Tip: Try more challenging texts to improve further!"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400 text-sm">
          Improve your typing skills with regular practice. The more you type,
          the faster you'll get!
        </div>
      </div>
    </div>
  );
}

export default App;
