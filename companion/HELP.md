## Pixelhue mediaserver

This module will allow you to control the following Pixelhue media server products: MS3, MS3 Pro.

### Configuration

- Enter the IP address of the product in the configuration settings.
- Select the device model.
- The device will use UDP communication.

**Available actions:**

- Program: Select and play a program
- Pause / Play / Stop: Control the current program
- Global Play / Global Pause / Global Stop: Control playback globally
- Open FTB / Close FTB
- Open Volume / Close Volume
- Volume + / Volume -
- Brightness + / Brightness -
- PPT page up / PPT page down

The following actions are available on MS3 Pro only:

- On Test PIC / OFF Test PIC
- Prev Program / Next Program
- Bind Media: Bind media by program and layer. Button text follows the action Program/Layer dropdowns.
- Bind CUE: Bind a CUE by index
- Select Media: Select media by program and layer
- Score + / Score - / Score Reset / Score Undo / Score Set: Control the selected score media (use Select Media first)

**Available feedbacks (MS3 Pro only):**

- Selected Media: Show this button's Program and Layer from the Select Media action. Changing the action dropdowns updates the button text.
- Bind Media: Show this button's Program and Layer from the Bind Media action. Changing the action dropdowns updates the button text.
