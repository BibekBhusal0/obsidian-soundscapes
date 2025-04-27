import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { ItemView } from "obsidian";
import { createRoot } from "react-dom/client";
import ReactApp from "../React/Components/App/App";
import { obsidianPluginContext } from "../React/Context/ObsidianPluginContext";
export const SOUNDSCAPES_REACT_VIEW = "soundscapes-react-view";
export class ReactView extends ItemView {
    constructor(plugin, settingsObservable, localPlayerStateObservable, leaf) {
        super(leaf);
        this.root = null;
        this.app = plugin.app;
        this.plugin = plugin;
        this.settingsObservable = settingsObservable;
        this.localPlayerStateObservable = localPlayerStateObservable;
    }
    getViewType() {
        return SOUNDSCAPES_REACT_VIEW;
    }
    getDisplayText() {
        return "Soundscapes: My Music";
    }
    getIcon() {
        return "music";
    }
    onOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            this.root = createRoot(this.containerEl.children[1]);
            this.root.render(_jsx(obsidianPluginContext.Provider, { value: {
                    app: this.app,
                    plugin: this.plugin,
                    settingsObservable: this.settingsObservable,
                    localPlayerStateObservable: this.localPlayerStateObservable,
                }, children: _jsx(ReactApp, {}) }));
            this.containerEl.addClass("soundscapesmymusic");
        });
    }
    onClose() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            (_a = this.root) === null || _a === void 0 ? void 0 : _a.unmount();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RWaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUmVhY3RWaWV3LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBTyxRQUFRLEVBQWlCLE1BQU0sVUFBVSxDQUFDO0FBQ3hELE9BQU8sRUFBUSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLFFBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUkvRSxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyx3QkFBd0IsQ0FBQztBQUUvRCxNQUFNLE9BQU8sU0FBVSxTQUFRLFFBQVE7SUFPdEMsWUFDQyxNQUF5QixFQUN6QixrQkFBOEIsRUFDOUIsMEJBQXNDLEVBQ3RDLElBQW1CO1FBRW5CLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQVpiLFNBQUksR0FBZ0IsSUFBSSxDQUFDO1FBYXhCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLDBCQUEwQixHQUFHLDBCQUEwQixDQUFDO0lBQzlELENBQUM7SUFFRCxXQUFXO1FBQ1YsT0FBTyxzQkFBc0IsQ0FBQztJQUMvQixDQUFDO0lBRUQsY0FBYztRQUNiLE9BQU8sdUJBQXVCLENBQUM7SUFDaEMsQ0FBQztJQUVELE9BQU87UUFDTixPQUFPLE9BQU8sQ0FBQztJQUNoQixDQUFDO0lBRUssTUFBTTs7WUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUNmLEtBQUMscUJBQXFCLENBQUMsUUFBUSxJQUM5QixLQUFLLEVBQUU7b0JBQ04sR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO29CQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtvQkFDM0MsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQjtpQkFDM0QsWUFFRCxLQUFDLFFBQVEsS0FBRyxHQUNvQixDQUNqQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNqRCxDQUFDO0tBQUE7SUFFSyxPQUFPOzs7WUFDWixNQUFBLElBQUksQ0FBQyxJQUFJLDBDQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3RCLENBQUM7S0FBQTtDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwLCBJdGVtVmlldywgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgUm9vdCwgY3JlYXRlUm9vdCB9IGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XG5pbXBvcnQgUmVhY3RBcHAgZnJvbSBcIi4uL1JlYWN0L0NvbXBvbmVudHMvQXBwL0FwcFwiO1xuaW1wb3J0IHsgb2JzaWRpYW5QbHVnaW5Db250ZXh0IH0gZnJvbSBcIi4uL1JlYWN0L0NvbnRleHQvT2JzaWRpYW5QbHVnaW5Db250ZXh0XCI7XG5pbXBvcnQgT2JzZXJ2YWJsZSBmcm9tIFwiLi4vc3JjL1V0aWxzL09ic2VydmFibGVcIjtcbmltcG9ydCBTb3VuZHNjYXBlc1BsdWdpbiBmcm9tIFwiLi4vbWFpblwiO1xuXG5leHBvcnQgY29uc3QgU09VTkRTQ0FQRVNfUkVBQ1RfVklFVyA9IFwic291bmRzY2FwZXMtcmVhY3Qtdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgUmVhY3RWaWV3IGV4dGVuZHMgSXRlbVZpZXcge1xuXHRyb290OiBSb290IHwgbnVsbCA9IG51bGw7XG5cdGFwcDogQXBwO1xuXHRwbHVnaW46IFNvdW5kc2NhcGVzUGx1Z2luO1xuXHRzZXR0aW5nc09ic2VydmFibGU6IE9ic2VydmFibGU7XG5cdGxvY2FsUGxheWVyU3RhdGVPYnNlcnZhYmxlOiBPYnNlcnZhYmxlO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHBsdWdpbjogU291bmRzY2FwZXNQbHVnaW4sXG5cdFx0c2V0dGluZ3NPYnNlcnZhYmxlOiBPYnNlcnZhYmxlLFxuXHRcdGxvY2FsUGxheWVyU3RhdGVPYnNlcnZhYmxlOiBPYnNlcnZhYmxlLFxuXHRcdGxlYWY6IFdvcmtzcGFjZUxlYWYsXG5cdCkge1xuXHRcdHN1cGVyKGxlYWYpO1xuXHRcdHRoaXMuYXBwID0gcGx1Z2luLmFwcDtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0XHR0aGlzLnNldHRpbmdzT2JzZXJ2YWJsZSA9IHNldHRpbmdzT2JzZXJ2YWJsZTtcblx0XHR0aGlzLmxvY2FsUGxheWVyU3RhdGVPYnNlcnZhYmxlID0gbG9jYWxQbGF5ZXJTdGF0ZU9ic2VydmFibGU7XG5cdH1cblxuXHRnZXRWaWV3VHlwZSgpIHtcblx0XHRyZXR1cm4gU09VTkRTQ0FQRVNfUkVBQ1RfVklFVztcblx0fVxuXG5cdGdldERpc3BsYXlUZXh0KCkge1xuXHRcdHJldHVybiBcIlNvdW5kc2NhcGVzOiBNeSBNdXNpY1wiO1xuXHR9XG5cblx0Z2V0SWNvbigpIHtcblx0XHRyZXR1cm4gXCJtdXNpY1wiO1xuXHR9XG5cblx0YXN5bmMgb25PcGVuKCkge1xuXHRcdHRoaXMucm9vdCA9IGNyZWF0ZVJvb3QodGhpcy5jb250YWluZXJFbC5jaGlsZHJlblsxXSk7XG5cdFx0dGhpcy5yb290LnJlbmRlcihcblx0XHRcdDxvYnNpZGlhblBsdWdpbkNvbnRleHQuUHJvdmlkZXJcblx0XHRcdFx0dmFsdWU9e3tcblx0XHRcdFx0XHRhcHA6IHRoaXMuYXBwLFxuXHRcdFx0XHRcdHBsdWdpbjogdGhpcy5wbHVnaW4sXG5cdFx0XHRcdFx0c2V0dGluZ3NPYnNlcnZhYmxlOiB0aGlzLnNldHRpbmdzT2JzZXJ2YWJsZSxcblx0XHRcdFx0XHRsb2NhbFBsYXllclN0YXRlT2JzZXJ2YWJsZTogdGhpcy5sb2NhbFBsYXllclN0YXRlT2JzZXJ2YWJsZSxcblx0XHRcdFx0fX1cblx0XHRcdD5cblx0XHRcdFx0PFJlYWN0QXBwIC8+XG5cdFx0XHQ8L29ic2lkaWFuUGx1Z2luQ29udGV4dC5Qcm92aWRlcj4sXG5cdFx0KTtcblx0XHR0aGlzLmNvbnRhaW5lckVsLmFkZENsYXNzKFwic291bmRzY2FwZXNteW11c2ljXCIpO1xuXHR9XG5cblx0YXN5bmMgb25DbG9zZSgpIHtcblx0XHR0aGlzLnJvb3Q/LnVubW91bnQoKTtcblx0fVxufVxuIl19