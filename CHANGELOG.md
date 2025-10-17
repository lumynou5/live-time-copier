# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- Disable current/remaining time switch on YouTube.  It makes time copying hard
  to use.

## [1.3.1] - 2025-05-15
### Fixed
- Locale string keys consisting with dash (`-`) don't work in Chrome.

## [1.3.0] - 2025-05-10
### Added
- A new option is added to pad zero for timestamps copied.
- A reset button is added to the option UI.
- Support recent broadcasts on Twitch.
### Fixed
- The "jump to live" button on YouTube was hidden since YouTube client version
  2.20250509.01.01.

## [1.2.0] - 2025-02-18
### Added
- Option UI supports dark theme now, selected by browser settings.
### Fixed
- Copying on Twitch results unwanted additional text.
### Changed
- Remove the save button in the option UI; change to preference is now auto-saved.
- Avoid getting configuration each time user copies timestamp.

## [1.1.0] - 2024-09-25
### Added
- Support Chrome.
- Add zh-TW translation.
- Add icons.

[1.3.1]: https://github.com/lumynou5/live-time-copier/releases/tag/v1.3.1
[1.3.0]: https://github.com/lumynou5/live-time-copier/releases/tag/v1.3.0
[1.2.0]: https://github.com/lumynou5/live-time-copier/releases/tag/v1.2.0
[1.1.0]: https://github.com/lumynou5/live-time-copier/releases/tag/v1.1.0
