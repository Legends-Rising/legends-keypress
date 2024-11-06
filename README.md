# 🎮 legends-keypress Standalone Key Press Mini-Game

This standalone mini-game for RedM RP servers challenges players with quick key-press actions against the clock! Players must press random keys within a limited time, with interactive audio feedback for key presses, success, and failure. The game includes dynamic UI positioning and customizable settings, making it adaptable and engaging.

## ✨ Features

- 🎲 **Random Key Challenge**: Players must react to random key prompts within a set time limit.
- 🛠️ **Configurable Settings**: Customize time limits and the number of key presses required for success.
- 🔊 **Audio Feedback**: Sounds for game start, key actions, and game end, enhancing immersion.
- 🎯 **Dynamic UI Repositioning**: Adds challenge with a UI that shifts on each key prompt.
- 🔌 **Standalone Functionality**: Easy integration with other scripts via exports.

## 📥 Installation

1. Clone or download this repository.
2. Add the mini-game folder to your RedM server’s `resources` directory.
3. Update your server configuration (`server.cfg`) to include:
   ```plaintext
   ensure legends-keypress
   ```

## 🚀 Usage

### Lua (Client-side)

Start the mini-game from other scripts using the `startkp` function, which accepts two parameters:
- ⏱️ `totalTime`: Total time allowed for the mini-game.
- 🔢 `totalKeysRequired`: Number of correct key presses needed to win.

#### Example Usage

```lua
-- Example command to start the mini-game
RegisterCommand('testkp', function()
    local totalTime = math.random(7, 10)
    local totalKeysRequired = math.random(5, 8)

    -- Initiate the mini-game
    local success = exports['legends-keypress']:startkp(totalTime, totalKeysRequired)
    if success then
        print("✅ WIN")
        -- Insert success actions (e.g., unlock door, reward player)
    else
        print("❌ FAIL")
        -- Insert failure actions (e.g., notify player, trigger alarm)
    end
end, false)
```

### 🔧 Exports

To start the mini-game programmatically:

```lua
exports['legends-keypress']:startkp(totalTime, totalKeysRequired)
```

### 💻 JavaScript (UI Script)

- Dynamically repositions the UI for each key prompt.
- Listens for Lua messages via `window.addEventListener` to start the mini-game.
- Plays sounds and updates the progress circle UI for each action and key press.

### 📡 NUI Callbacks

Lua and JavaScript interact using the following callbacks:
- **`minigameResult`**: Sends the success (`✅ true`) or failure (`❌ false`) result back to Lua.
- **`playsound`**: Triggers sounds for different actions.

## ⚙️ Configuration

Adjust settings as needed:
- 🔊 **Sound Customization**: Modify `soundName` and `soundSet` in `playsound` for custom sounds.
- 📐 **UI Positioning**: The `repositionUI` function in `script.js` randomizes UI location to add complexity.

## 🖼️ Preview

Experience this fast-paced mini-game with engaging sound and visual feedback. Here’s a preview of its functionality:

1. 🟢 **Start**: A random key prompt appears, initiating the countdown.
2. ⌨️ **Feedback**: Responds with sounds and visuals for each correct key press.
3. 🎉 **End**: Shows success or failure based on player performance.

🚀 **Preview Video**
[legends-keypress Standalone Mini-Game Preview](https://streamable.com/y6uq59)
