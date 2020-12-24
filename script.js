Phoenix.set({
    daemon: true,
    openAtLogin: true,
});

const toggleApp = (name) => () => {
    const app = App.get(name) || App.launch(name);
    app && app.isActive() ? app.hide() : app.focus();
}

const currentWindow = () => Window.focused() || App.focused().mainWindow()

const setWindowLayout = (x, y, width, height) => () => {
    const window = currentWindow();
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
    const window = currentWindow();

    window && window.setTopLeft({
        x: (window.screen().flippedVisibleFrame().width - window.size().width) / 2 + window.screen().flippedVisibleFrame().x,
        y: (window.screen().flippedVisibleFrame().height - window.size().height) / 2 + window.screen().flippedVisibleFrame().y
    })
}

const moveWindowToNextScreen = () => {
    const window = currentWindow()
    if (!window || window.screen() === window.screen().next()) return;

    moveWindowToScreen(window, window.screen().next());
    window.focus();
}

const moveWindowToPreviousScreen = () => {
    const window = currentWindow();
    if (!window && window.screen() === window.screen().next()) return;

    moveWindowToScreen(window, window.screen().previous());
    window.focus();
}

const moveWindowToScreen = (window, screen) => {
    if (!window || !screen) return;
    const newScreen = screen.visibleFrameInRectangle();

    window.setFrame({
        x: newScreen.x,
        y: newScreen.y,
        width: newScreen.width,
        height: newScreen.height
    });
};

Key.on('1', ['alt'], toggleApp('IntelliJ IDEA'));
Key.on('2', ['alt'], toggleApp('Firefox'));
Key.on('3', ['alt'], toggleApp('Mail'));
Key.on('4', ['alt'], toggleApp('Calendar'));
Key.on('e', ['alt'], toggleApp('iTerm'));
Key.on('q', ['alt'], toggleApp('Slack'));
Key.on('w', ['alt'], toggleApp('Microsoft Teams'));
Key.on('d', ['alt'], toggleApp('Discord'));
Key.on('s', ['alt'], toggleApp('Spotify'));
Key.on('f', ['alt'], toggleApp('Finder'));

Key.on('left', ['cmd'], setWindowLayout(0, 0, 0.5, 1));
Key.on('right', ['cmd'], setWindowLayout(0.5, 0, 0.5, 1));
Key.on('up', ['cmd'], setWindowLayout(0, 0, 1, 1));
Key.on('down', ['cmd'], centerWindow)

Key.on('left', ['cmd', 'ctrl'], moveWindowToNextScreen);
Key.on('right', ['cmd', 'ctrl'], moveWindowToPreviousScreen);
