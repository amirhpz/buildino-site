(() => {
    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem('buildino-theme');
    } catch {
        // The system preference remains available when storage is disabled.
    }

    const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
    const useDarkTheme = savedTheme ? savedTheme === 'dark' : prefersDark;
    const theme = useDarkTheme ? 'dark' : 'light';

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
})();
