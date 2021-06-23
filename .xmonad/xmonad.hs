-- xmonad example config file.
--
-- A template showing all available configuration hooks,
-- and how to override the defaults in your own xmonad.hs conf file.
--
-- Normally, you'd only override those defaults you care about.
--
--
import XMonad
import Data.Monoid
import System.Exit
import XMonad.Util.SpawnOnce
import XMonad.Util.Run

import XMonad.Hooks.ManageDocks
import XMonad.Hooks.DynamicLog (dynamicLogWithPP, wrap, xmobarPP, xmobarColor, shorten, PP(..))
import XMonad.Hooks.WorkspaceHistory
import XMonad.Hooks.EwmhDesktops

import XMonad.Layout.Gaps
import XMonad.Layout.Spiral
import XMonad.Layout.ThreeColumns
import XMonad.Layout.Tabbed
import XMonad.Layout.GridVariants (Grid(Grid))
import XMonad.Layout.Spacing
import XMonad.Layout.LayoutModifier
import XMonad.Layout.ResizableTile
import XMonad.Layout.Renamed
import XMonad.Layout.WindowNavigation
import XMonad.Layout.LimitWindows (limitWindows, increaseLimit, decreaseLimit)
import XMonad.Layout.Fullscreen

import XMonad.Actions.CopyWindow (kill1)
import XMonad.Actions.Promote
import XMonad.Actions.WithAll (killAll)
import XMonad.Actions.CycleWS(moveTo, shiftTo, nextScreen, prevScreen)

import XMonad.Util.EZConfig (additionalKeysP)
import XMonad.Util.Run

import qualified XMonad.StackSet as W
import qualified Data.Map        as M


myTerminal :: String
myTerminal = "alacritty"

myBrowser :: String
myBrowser = "brave"

myEditor :: String
myEditor = "nvim"

myFocusFollowsMouse :: Bool
myFocusFollowsMouse = True

myClickJustFocuses :: Bool
myClickJustFocuses = False



-- Width of the window border in pixels.
--
myBorderWidth   = 2

-- modMask lets you specify which modkey you want to use. The default
-- is mod1Mask ("left alt").  You may also consider using mod3Mask
-- ("right alt"), which does not conflict with emacs keybindings. The
-- "windows key" is usually mod4Mask.
--
myModMask       = mod4Mask

-- The default number of workspaces (virtual screens) and their names.
-- By default we use numeric strings, but any string may be used as a
-- workspace name. The number of workspaces is determined by the length
-- of this list.
--
-- A tagging example:
--
-- > workspaces = ["web", "irc", "code" ] ++ map show [4..9]
--
myWorkspaces    = ["1","2","3","4","5","6","7","8","9"]

-- Border colors for unfocused and focused windows, respectively.
--
myNormalBorderColor  = "#282828"
myFocusedBorderColor = "#bd93f9"

mySpacing :: Integer -> l a -> XMonad.Layout.LayoutModifier.ModifiedLayout Spacing l a
mySpacing i = spacingRaw False (Border i i i i) True (Border i i i i) True

normal = renamed [Replace "normal"]
  $ windowNavigation
  $ limitWindows 12
  $ mySpacing 1
  $ ResizableTall 1 (3/100) (1/2) []

spirals = renamed [Replace "spirals"]
	$ windowNavigation
	$ mySpacing 8
	$ spiral (6/7)

threeCol = renamed [Replace "threeCol"]
	$ mySpacing 8
	$ limitWindows 7
	$ ThreeCol 0 (3/100) (1/2)

grid = renamed [Replace "grid"]
  $ mySpacing 8
	$ Grid (16/10)

------------------------------------------------------------------------
-- Key bindings. Add, modify or remove key bindings here.
--
myKeys :: [(String, X ())]
myKeys =
	--Launch Programs
	[("M-<Return>", spawn (myTerminal))
	,("M-w",        spawn (myBrowser))
	,("M-d",	spawn ("rofi -no-lazy-grab -show drun -modi drun -theme /home/thor/.config/rofi/launchers/ribbon/ribbon_right.rasi"))
	,("M-e",	spawn ("alacritty -e neomutt"))
	,("M-m",  spawn ("alacritty -e ncmpcpp"))
	,("M-r",	spawn ("alacritty -e ranger"))
	,("M-n",	spawn ("alacritty -e nvim"))
	,("M-c",	spawn ("alacritty -e calcurse"))
	,("M-æ",	spawn ("rofi -no-lazy-grab -show emoji -modi emoji -theme ~/.config/rofi/launchers/text/style_3.rasi"))
	,("M-p",	spawn ("xournalpp"))
	,("M-<Print>",	spawn ("scrot '%Y-%m-%d_$wx$h.png' -se 'mv $n ~/Pictures/scrot/' "))
	,("M-<KP_Enter>",	spawn ("rofi -no-lazy-grab -show calc -modi calc -theme ~/.config/rofi/launchers/text/style_1.rasi"))
  ,("M-<Esc>", spawn ("/usr/local/bin/./powermenu.sh"))

	--Navigation
	,("M-j", windows W.focusDown)
	,("M-k", windows W.focusUp)
	,("M-S-j", windows W.swapDown)
	,("M-S-k", windows W.swapUp)
	,("M-<Space>", windows W.swapMaster)
	,("M-.", nextScreen)
	,("M-,", prevScreen)

	--Kill window(s)
	,("M-q", kill1)
	,("M-S-q", killAll)

	--Gaps
	,("M-z", incWindowSpacing 5)
	,("M-x", decWindowSpacing 5)
	,("M-h", sendMessage Shrink)
	,("M-l", sendMessage Expand)
	
	--Xmonad
	--,("M-C-ø", io exitSucces)
	,("M-ø", spawn "xmonad --restart")
	,("M-f", sendMessage ToggleStruts <+> setWindowSpacing (Border 0 0 0 0))
	--,("M-S-r" spawn "xmonad --recompile")
	
	--Music
	,("M-<Insert>", spawn ("mpc toggle"))
	,("M-<Delete>", spawn ("mpc stop"))
	,("M-<Home>", spawn ("mpc next"))
	,("M-<End>", spawn ("mpc prev"))

	--Volume
	,("M-<Page_Up>", spawn ("pamixer --allow-boost -i 5"))
	,("M-S-<Page_Up>", spawn ("pamixer --allow-boost -i 15"))
	,("M-<Page_Down>", spawn ("pamixer --allow-boost -d 5"))
	,("M-S-<Page_Down>", spawn ("pamixer --allow-boost -d 15"))
	,("M-S-m", spawn ("pamixer -t"))

	--Layout	
	,("M-<Tab>", sendMessage NextLayout)

	--Pen and Pad	
	,("M-<F11>", spawn ("xsetwacom set 'Wacom Intuos BT S Pen stylus' MapToOutput DisplayPort-0"))
	,("M-<F12>", spawn ("xsetwacom set 'Wacom Intuos BT S Pen stylus' MapToOutput HDMI-A-0"))

	--Labtop
	--Volume
	--,("<XF86AudioRaiseVolume>", spawn ("pamixer --allow-boost -i 5"))
	--,("S-<XF86AudioRaiseVolume>", spawn ("pamixer --allow-boost -i 15"))
	--,("<XF86AudioLowerVolume>", spawn ("pamixer --allow-boost -d 5"))
	--,("S-<XF86AudioLowerVolume>", spawn ("pamixer --allow-boost -d 15"))
	--,("<XF86AudioMute>", spawn ("pamixer -t"))
	--
	----Brightness
	--,("<XF86MonBrightnessUp>", spawn ("light -A 10"))
	--,("<XF86MonBrightnessDown>", spawn ("light -U 10"))

	]



myManageHook = composeAll
    [ XMonad.Layout.Fullscreen.fullscreenManageHook]

myEventHook = handleEventHook def <+> XMonad.Hooks.EwmhDesktops.fullscreenEventHook <+> XMonad.Layout.Fullscreen.fullscreenEventHook


------------------------------------------------------------------------
-- Status bars and logging

-- Perform an arbitrary action on each internal state change or X event.
-- See the 'XMonad.Hooks.DynamicLog' extension for examples.
--
myLogHook = return ()
myLayoutHook = avoidStruts $ myDefaultLayout
       where
           myDefaultLayout = normal ||| spirals ||| threeCol ||| grid ||| Full
------------------------------------------------------------------------
-- Startup hook

-- Perform an arbitrary action each time xmonad starts or is restarted
-- with mod-q.  Used by, e.g., XMonad.Layout.PerWorkspace to initialize
-- per-workspace layout choices.
--
-- By default, do nothing.
windowCount :: X (Maybe String)
windowCount = gets $ Just . show . length . W.integrate' . W.stack . W.workspace . W.current . windowset


myStartupHook = do 
				spawnOnce "nitrogen --restore &"
				spawnOnce "picom &"
				spawnOnce "mpd &"
				spawnOnce "setxkbmap dk &"
				spawnOnce "unclutter &"
				spawnOnce "xmodmap ~/.Xmodmap &"
------------------------------------------------------------------------
-- Now run xmonad with all the defaults we set up.
--
-- Run xmonad with the settings you specify. No need to modify this.
--
main :: IO()
main = do

  xmproc0 <- spawnPipe "xmobar -x 0 $HOME/.config/xmobar/xmobarrc0"
  xmproc1 <- spawnPipe "xmobar -x 1 $HOME/.config/xmobar/xmobarrc1"

  xmonad $ fullscreenSupport $ docks def {
      -- simple stuff
        terminal           = myTerminal,
        focusFollowsMouse  = myFocusFollowsMouse,
        clickJustFocuses   = myClickJustFocuses,
        borderWidth        = myBorderWidth,
        modMask            = myModMask,
        workspaces         = myWorkspaces,
        normalBorderColor  = myNormalBorderColor,
        focusedBorderColor = myFocusedBorderColor,

      -- hooks, layouts
        layoutHook         = myLayoutHook,
        manageHook         = myManageHook,
        handleEventHook    = myEventHook,
        startupHook        = myStartupHook,
        logHook            = workspaceHistoryHook <+> myLogHook <+> dynamicLogWithPP xmobarPP
	        { ppOutput = \x -> hPutStrLn xmproc0 x >> hPutStrLn xmproc1 x
		, ppCurrent = xmobarColor "#b4be82" "" . wrap "{" "}"
		, ppVisible = xmobarColor "#b4be82" "" 
		, ppHidden = xmobarColor "#89b8c2" "" . wrap "*" "" 
		, ppHiddenNoWindows = xmobarColor "#ba093c7" "" 
		, ppTitle = xmobarColor "#b4be82" "" . shorten 60
		, ppSep = "<fc=#a89984> <fn=1>    </fn> </fc>"
		, ppUrgent = xmobarColor "#cc241d" "". wrap "!" "!"
		, ppExtras = [windowCount] 
		, ppLayout = xmobarColor "#e27878" ""
		, ppOrder = \(ws:l:t:ex) -> [ws,l]++ex++[t]
		}
    } `additionalKeysP` myKeys
--Labtop
--
--main :: IO()
--main = do
--
--  xmproc1 <- spawnPipe "xmobar -x 1 $HOME/.config/xmobar/xmobarrclab"
--
--  xmonad $ fullscreenSupport $ docks def {
--      -- simple stuff
--        terminal           = myTerminal,
--        focusFollowsMouse  = myFocusFollowsMouse,
--        clickJustFocuses   = myClickJustFocuses,
--        borderWidth        = myBorderWidth,
--        modMask            = myModMask,
--        workspaces         = myWorkspaces,
--        normalBorderColor  = myNormalBorderColor,
--        focusedBorderColor = myFocusedBorderColor,
--
--      -- hooks, layouts
--        layoutHook         = myLayoutHook,
--        manageHook         = myManageHook,
--        handleEventHook    = myEventHook,
--        startupHook        = myStartupHook,
--        logHook            = workspaceHistoryHook <+> myLogHook <+> dynamicLogWithPP xmobarPP
--	        { ppOutput = \x -> hPutStrLn xmproc1 x
--		, ppCurrent = xmobarColor "#b4be82" "" . wrap "{" "}"
--		, ppVisible = xmobarColor "#b4be82" "" 
--		, ppHidden = xmobarColor "#89b8c2" "" . wrap "*" "" 
--		, ppHiddenNoWindows = xmobarColor "#ba093c7" "" 
--		, ppTitle = xmobarColor "#b4be82" "" . shorten 60
--		, ppSep = "<fc=#a89984> <fn=1>    </fn> </fc>"
--		, ppUrgent = xmobarColor "#cc241d" "". wrap "!" "!"
--		, ppExtras = [windowCount] 
--		, ppLayout = xmobarColor "#e27878" ""
--		, ppOrder = \(ws:l:t:ex) -> [ws,l]++ex++[t]
--		}
--    } `additionalKeysP` myKeys
