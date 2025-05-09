import { Modal, Setting } from "obsidian";
class ConfirmModal extends Modal {
    constructor(app, onConfirm, title, text, confirmButtonText, cancelButtonText = "Cancel") {
        super(app);
        this._onConfirm = onConfirm;
        this._title = title;
        this._text = text;
        this._confirmButtonText = confirmButtonText;
        this._cancelButtonText = cancelButtonText;
    }
    onOpen() {
        const { contentEl } = this;
        contentEl.createEl("h2", { text: this._title });
        contentEl.createEl("p", { text: this._text });
        new Setting(contentEl)
            .addButton((component) => {
            component.setButtonText(this._confirmButtonText);
            component.setClass("mod-warning");
            component.onClick(() => {
                this._onConfirm();
                this.close();
            });
        })
            .addButton((component) => {
            component.setButtonText(this._cancelButtonText);
            component.onClick(() => {
                this.close();
            });
        });
    }
    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
export default ConfirmModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlybU1vZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29uZmlybU1vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFPLE1BQU0sVUFBVSxDQUFDO0FBRS9DLE1BQU0sWUFBYSxTQUFRLEtBQUs7SUFPL0IsWUFDQyxHQUFRLEVBQ1IsU0FBbUIsRUFDbkIsS0FBYSxFQUNiLElBQVksRUFDWixpQkFBeUIsRUFDekIsbUJBQTJCLFFBQVE7UUFFbkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRVgsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDO1FBQzVDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztJQUMzQyxDQUFDO0lBRUQsTUFBTTtRQUNMLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFM0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDaEQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFOUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDO2FBQ3BCLFNBQVMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3hCLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDakQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUVsQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQzthQUNELFNBQVMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3hCLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDaEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTztRQUNOLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDM0IsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25CLENBQUM7Q0FDRDtBQUVELGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kYWwsIFNldHRpbmcsIEFwcCB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5cclxuY2xhc3MgQ29uZmlybU1vZGFsIGV4dGVuZHMgTW9kYWwge1xyXG5cdF9vbkNvbmZpcm06IEZ1bmN0aW9uO1xyXG5cdF90aXRsZTogc3RyaW5nO1xyXG5cdF90ZXh0OiBzdHJpbmc7XHJcblx0X2NvbmZpcm1CdXR0b25UZXh0OiBzdHJpbmc7XHJcblx0X2NhbmNlbEJ1dHRvblRleHQ6IHN0cmluZztcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRhcHA6IEFwcCxcclxuXHRcdG9uQ29uZmlybTogRnVuY3Rpb24sXHJcblx0XHR0aXRsZTogc3RyaW5nLFxyXG5cdFx0dGV4dDogc3RyaW5nLFxyXG5cdFx0Y29uZmlybUJ1dHRvblRleHQ6IHN0cmluZyxcclxuXHRcdGNhbmNlbEJ1dHRvblRleHQ6IHN0cmluZyA9IFwiQ2FuY2VsXCJcclxuXHQpIHtcclxuXHRcdHN1cGVyKGFwcCk7XHJcblxyXG5cdFx0dGhpcy5fb25Db25maXJtID0gb25Db25maXJtO1xyXG5cdFx0dGhpcy5fdGl0bGUgPSB0aXRsZTtcclxuXHRcdHRoaXMuX3RleHQgPSB0ZXh0O1xyXG5cdFx0dGhpcy5fY29uZmlybUJ1dHRvblRleHQgPSBjb25maXJtQnV0dG9uVGV4dDtcclxuXHRcdHRoaXMuX2NhbmNlbEJ1dHRvblRleHQgPSBjYW5jZWxCdXR0b25UZXh0O1xyXG5cdH1cclxuXHJcblx0b25PcGVuKCkge1xyXG5cdFx0Y29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XHJcblxyXG5cdFx0Y29udGVudEVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiB0aGlzLl90aXRsZSB9KTtcclxuXHRcdGNvbnRlbnRFbC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiB0aGlzLl90ZXh0IH0pO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcclxuXHRcdFx0LmFkZEJ1dHRvbigoY29tcG9uZW50KSA9PiB7XHJcblx0XHRcdFx0Y29tcG9uZW50LnNldEJ1dHRvblRleHQodGhpcy5fY29uZmlybUJ1dHRvblRleHQpO1xyXG5cdFx0XHRcdGNvbXBvbmVudC5zZXRDbGFzcyhcIm1vZC13YXJuaW5nXCIpO1xyXG5cclxuXHRcdFx0XHRjb21wb25lbnQub25DbGljaygoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLl9vbkNvbmZpcm0oKTtcclxuXHRcdFx0XHRcdHRoaXMuY2xvc2UoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmFkZEJ1dHRvbigoY29tcG9uZW50KSA9PiB7XHJcblx0XHRcdFx0Y29tcG9uZW50LnNldEJ1dHRvblRleHQodGhpcy5fY2FuY2VsQnV0dG9uVGV4dCk7XHJcblx0XHRcdFx0Y29tcG9uZW50Lm9uQ2xpY2soKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5jbG9zZSgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG9uQ2xvc2UoKSB7XHJcblx0XHRjb25zdCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcclxuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xyXG4iXX0=