# Design Spec: Footer Coordinates Update

Update the physical location coordinates in the website footer and its corresponding Google Maps link to reflect the new location: `20°00'51.2"N 75°50'04.7"W`.

## User Review Required

> [!IMPORTANT]
> The Google Maps link will use the decimal format `20.014222,-75.834639` for better compatibility with the Google Maps Search API.

- [ ] I have verified the decimal conversion of the coordinates.
- [ ] I agree with adding the missing `address` and `map_link` keys to the English translation file.

## Proposed Changes

### 1. Internationalization (i18n)

#### `frontend/src/locales/es/translation.json`
- Update `footer.address` to `"20°00'51.2\"N 75°50'04.7\"W"`
- Update `footer.map_link` to `"https://www.google.com/maps/search/?api=1&query=20.014222,-75.834639"`

#### `frontend/src/locales/en/translation.json`
- Add `footer.address`: `"20°00'51.2\"N 75°50'04.7\"W"`
- Add `footer.map_link`: `"https://www.google.com/maps/search/?api=1&query=20.014222,-75.834639"`

### 2. Frontend Components

#### `frontend/src/components/Footer.jsx`
- Verify that the `<a>` tag for the location correctly uses `{t('footer.map_link')}` and `{t('footer.address')}`.
- (Already confirmed in research, no changes expected unless a bug is found during implementation).

## Testing Plan

### Automated Tests
- None planned for this content change.

### Manual Verification
1. Run the frontend development server.
2. Verify the footer text shows "20°00'51.2\"N 75°50'04.7\"W" in both English and Spanish languages.
3. Click the location link and verify it opens Google Maps at the correct location (Santiago de Cuba).
