
local isMinigameActive = false

------------------------------------------------------------
-- Functions
------------------------------------------------------------

function startkp(totalTime, totalKeysRequired)
    if isMinigameActive then
        print("Minigame already active.")
        return false
    end

    isMinigameActive = true

    print("Starting minigame with Time:", totalTime, "Keys Required:", totalKeysRequired)

    -- Send parameters to the NUI to start the minigame
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'startMinigame',
        totalTime = totalTime,
        totalKeysRequired = totalKeysRequired
    })

    -- Create a promise-like mechanism to wait for the result
    local result = nil
    local finished = false

    -- Define a temporary event listener
    local function onMinigameResult(success)
        result = success
        finished = true
    end

    -- Add the temporary event listener
    AddEventHandler('lockpick:result', onMinigameResult)

    -- Wait until the minigame is finished
    while not finished do
        Citizen.Wait(0)
    end

    -- Clear NUI focus
    SetNuiFocus(false, false)

    isMinigameActive = false

    return result
end

------------------------------------------------------------
-- NUI callbacks
------------------------------------------------------------

-- Register the export so other scripts can use the startkp function
exports('startkp', startkp)

-- Handle NUI callbacks
RegisterNUICallback('minigameResult', function(data, cb)
    local success = data.success
    -- Trigger the event with the result
    TriggerEvent('lockpick:result', success)
    cb('ok')
end)

------------------------------------------------------------
-- Audio for UI
------------------------------------------------------------

RegisterNUICallback('playsound', function(data) 
    local soundName = data.soundName
    local soundSet = data.soundSet
    PlaySoundFrontend(soundName, soundSet, true, 0)
end)

function playStartSound()
    SendNUIMessage({action = 'playsound', soundName = "SELECT", soundSet = "RDRO_Character_Creator_Sounds"})
end

function playKeyPressSound()
    SendNUIMessage({action = 'playsound', soundName = "NAV_LEFT", soundSet = "PAUSE_MENU_SOUNDSET"})
end


------------------------------------------------------------
-- TEST
------------------------------------------------------------

RegisterCommand('testkp', function()
    local totalTime = math.random(7, 10) -- Random total time between 7 and 10 seconds
    local totalKeysRequired = math.random(5, 8) -- Random number of key presses required between 2 and 4

    -- Call the exported function and store the result
    local success = exports['legends-keypress']:startkp(totalTime, totalKeysRequired)

    -- Handle the result
    if success then
        print("WIN")
        -- Add your success logic here (e.g., give item, unlock door)
    else
        print("FAIL")
        -- Add your failure logic here (e.g., notify player, trigger alarm)
    end
end, false)
