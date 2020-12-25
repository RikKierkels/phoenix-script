Phoenix.set({
    daemon: true,
    openAtLogin: true,
});

const getCurrentWindow = () => Window.focused() || App.focused().mainWindow()
const showOrHideApp = (name) => () => {
    const app = App.get(name) ?? App.launch(name);
    app && app.isActive() ? app.hide() : app.focus();
}

const setWindowLayout = (x, y, width, height) => () => {
    const window = getCurrentWindow();
    if (!window) return;

    const screenFrame = window.screen().flippedVisibleFrame();
    const screenWidth = screenFrame.width;
    const screenHeight = screenFrame.height;

    window.setFrame({
        x: screenFrame.x + screenWidth * x,
        y: screenFrame.y + screenHeight * y,
        width: screenWidth * width,
        height: screenHeight * height
    });
}

const centerWindow = () => {
    const window = getCurrentWindow();
    if (!window) return;

    window.setTopLeft({
        x: (window.screen().flippedVisibleFrame().width - window.size().width) / 2 + window.screen().flippedVisibleFrame().x,
        y: (window.screen().flippedVisibleFrame().height - window.size().height) / 2 + window.screen().flippedVisibleFrame().y
    })
}

const moveWindowToNextScreen = () => {
    const window = getCurrentWindow()
    if (!window) return;

    const currentScreen = window.screen();
    const nextScreen = currentScreen.next();
    if (currentScreen === nextScreen) return;

    moveWindowToScreen(window, nextScreen);
    window.focus();
}

const moveWindowToPreviousScreen = () => {
    const window = getCurrentWindow()
    if (!window) return;

    const currentScreen = window.screen();
    const previousScreen = currentScreen.previous();
    if (currentScreen === previousScreen) return;

    moveWindowToScreen(window, previousScreen);
    window.focus();
}

const moveWindowToScreen = (window, screen) => {
    const frame = screen.visibleFrameInRectangle();

    window.setFrame({
        x: frame.x,
        y: frame.y,
        width: frame.width,
        height: frame.height
    });
};

Key.on('1', ['alt'], showOrHideApp('IntelliJ IDEA'));
Key.on('2', ['alt'], showOrHideApp('Firefox'));
Key.on('3', ['alt'], showOrHideApp('Mail'));
Key.on('4', ['alt'], showOrHideApp('Calendar'));
Key.on('e', ['alt'], showOrHideApp('iTerm'));
Key.on('q', ['alt'], showOrHideApp('Slack'));
Key.on('w', ['alt'], showOrHideApp('Microsoft Teams'));
Key.on('d', ['alt'], showOrHideApp('Discord'));
Key.on('s', ['alt'], showOrHideApp('Spotify'));
Key.on('f', ['alt'], showOrHideApp('Finder'));

Key.on('left', ['cmd'], setWindowLayout(0, 0, 0.5, 1));
Key.on('right', ['cmd'], setWindowLayout(0.5, 0, 0.5, 1));
Key.on('up', ['cmd'], setWindowLayout(0, 0, 1, 1));
Key.on('down', ['cmd'], centerWindow)

Key.on('left', ['cmd', 'ctrl'], moveWindowToNextScreen);
Key.on('right', ['cmd', 'ctrl'], moveWindowToPreviousScreen);
