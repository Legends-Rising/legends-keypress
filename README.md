Here's the updated `README.md` with a YouTube preview link:
# 🎮 RedM RP Standalone Key Press Mini-Game

This RedM standalone mini-game for RP servers challenges players to press random keys within a time limit. Players must press the correct keys to succeed, with audio feedback for actions such as starting the game, pressing keys, and failing. The game includes UI animations and configurable options.

## ✨ Features

- 🎲 **Random Key Challenge**: Players must press a randomly displayed key within a given time.
- 🛠️ **Configurable Time & Key Count**: Set custom time limits and required key presses.
- 🔊 **Audio Feedback**: Sound effects for game start, key presses, and failure.
- 🎯 **UI Repositioning**: The mini-game UI moves dynamically to add challenge.
- 🔌 **Standalone**: Compatible with other scripts via exports.

## 📥 Installation

1. Clone or download this repository.
2. Add the mini-game folder to your RedM server `resources` directory.
3. Ensure the resource is listed in your server configuration (`server.cfg`):
   ```plaintext
   ensure legends-keypress
   ```

## 🚀 Usage

### Lua (Client-side)

The mini-game can be started from other scripts by calling the `startkp` function. It takes two parameters:
- ⏱️ `totalTime`: The time limit for the mini-game.
- 🔢 `totalKeysRequired`: The total number of correct key presses needed to succeed.

#### Example Usage

```lua
-- To start the mini-game with randomized values
RegisterCommand('testkp', function()
    local totalTime = math.random(7, 10)
    local totalKeysRequired = math.random(5, 8)

    -- Start the mini-game and get the result
    local success = exports['legends-keypress']:startkp(totalTime, totalKeysRequired)
    if success then
        print("✅ WIN")
        -- Success logic (e.g., unlock door, reward player)
    else
        print("❌ FAIL")
        -- Failure logic (e.g., notify player, trigger alarm)
    end
end, false)
```

### 🔧 Exports

To start the mini-game programmatically from other scripts, use:

```lua
exports['legends-keypress']:startkp(totalTime, totalKeysRequired)
```

### 💻 JavaScript (UI Script)

- The mini-game UI dynamically repositions for each new key.
- Uses `window.addEventListener` to listen for Lua messages to start the game.
- Plays sounds and updates the progress circle UI as time elapses and keys are pressed.

### 📡 NUI Callbacks

Lua and JavaScript communicate through the following callbacks:
- **`minigameResult`**: Sends the mini-game result (`✅ true` for success, `❌ false` for failure) back to Lua.
- **`playsound`**: Triggers sound playback for specific actions.

## ⚙️ Configuration

Adjust the following parameters in your scripts as needed:
- 🔊 **Sound Settings**: Customize sounds in `playsound` by modifying the `soundName` and `soundSet`.
- 📐 **UI Positioning**: `repositionUI` function in `script.js` randomizes the UI location within boundaries.

## 🖼️ Preview

The mini-game UI dynamically repositions, providing a more interactive experience with timed and key-press challenges. Here’s a quick overview of how it works:

1. 🟢 **Start**: Displays a random key to press within a time limit.
2. ⌨️ **Key Press Feedback**: Plays a sound and visually responds to correct key presses.
3. 🎉 **Result**: Shows success or failure, depending on the player's performance.

the preview video Soon:


