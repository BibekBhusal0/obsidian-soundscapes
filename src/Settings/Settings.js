import { PluginSettingTab, Setting } from "obsidian";
import electron from "electron";
export const DEFAULT_SETTINGS = {
    soundscape: "my_music",
    volume: 25,
    autoplay: false,
    scrollSongTitle: true,
    myMusicIndex: [],
    myMusicFolderPath: "",
    reindexFrequency: "5",
    myMusicShuffle: false,
    currentTrackIndex: 0,
};
export class SoundscapesSettingsTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        const { containerEl } = this;
        containerEl.empty();
        new Setting(containerEl)
            .setName("Soundscape")
            .setDesc(`Which soundscape would you like to listen to?`)
            .addDropdown((component) => {
            component.addOption("my_music", "My Music");
            component.setValue(this.plugin.settings.soundscape);
            component.onChange((value) => {
                this.plugin.changeSoundscape(value);
                this.display();
            });
        });
        new Setting(containerEl)
            .setName("Autoplay soundscape")
            .setDesc(`Automatically play chosen soundscape on startup?`)
            .addToggle((component) => {
            component.setValue(this.plugin.settings.autoplay);
            component.onChange((value) => {
                this.plugin.settings.autoplay = value;
                this.plugin.saveSettings();
            });
        });
        new Setting(containerEl)
            .setName("Scroll song title")
            .setDesc(`Save space on the status bar by scrolling song title?`)
            .addToggle((component) => {
            component.setValue(this.plugin.settings.scrollSongTitle);
            component.onChange((value) => {
                this.plugin.settings.scrollSongTitle = value;
                this.plugin.toggleNowPlayingScroll();
                this.plugin.saveSettings();
            });
        });
        containerEl.createEl("h1", { text: "My Music" });
        containerEl.createEl("p", {
            text: "The My Music Soundscape plays music files from your local computer. It includes a dedicated view for managing your music in addition to the mini-player on the statusbar.",
        });
        new Setting(containerEl)
            .setName("Music path")
            .setDesc(`Path to where your music files are located. Plugin will also search through all subfolders of the provided folder.`)
            .addText((component) => {
            component.setDisabled(true);
            component.setValue(this.plugin.settings.myMusicFolderPath);
        })
            .addExtraButton((component) => {
            component.setIcon("folder-open");
            component.setTooltip("Select folder");
            component.onClick(() => {
                // @ts-ignore
                electron.remote.dialog
                    .showOpenDialog({
                    properties: ["openDirectory"],
                    title: "Select a folder",
                })
                    .then((result) => {
                    if (!result.canceled) {
                        this.plugin.settings.myMusicFolderPath =
                            result.filePaths[0];
                        // We need to reset the index and force it to reindex now that we have a new path
                        this.plugin.settings.myMusicIndex = [];
                        this.plugin.saveSettings();
                        this.display();
                        this.plugin.indexMusicLibrary();
                        this.plugin.onSoundscapeChange();
                    }
                });
            });
        });
        new Setting(containerEl)
            .setName("Periodic re-index")
            .setDesc("To keep your music library up to date, the plugin needs to occasionally re-index from your music folder. You can disable this if you would prefer to manually trigger re-indexes. Re-indexes will also be triggered on startup of Obsidian or when the Soundscape or music folder path are changed.")
            .addDropdown((component) => {
            component.addOption("never", "Never");
            component.addOption("5", "5 Minutes (default)");
            component.addOption("15", "15 Minutes");
            component.addOption("30", "30 Minutes");
            component.addOption("60", "60 Minutes");
            component.addOption("1440", "Daily");
            component.setValue(this.plugin.settings.reindexFrequency);
            component.onChange((value) => {
                this.plugin.settings.reindexFrequency = value;
                this.plugin.saveSettings();
                this.display();
            });
        })
            .addExtraButton((component) => {
            component.setIcon("folder-sync");
            component.setTooltip("Re-index now");
            component.onClick(() => {
                this.plugin.indexMusicLibrary();
            });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQU8sZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzFELE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQWVoQyxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBOEI7SUFDMUQsVUFBVSxFQUFFLFVBQVU7SUFDdEIsTUFBTSxFQUFFLEVBQUU7SUFDVixRQUFRLEVBQUUsS0FBSztJQUNmLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLFlBQVksRUFBRSxFQUFFO0lBQ2hCLGlCQUFpQixFQUFFLEVBQUU7SUFDckIsZ0JBQWdCLEVBQUUsR0FBRztJQUNyQixjQUFjLEVBQUUsS0FBSztJQUNyQixpQkFBaUIsRUFBRSxDQUFDO0NBQ3BCLENBQUM7QUFFRixNQUFNLE9BQU8sc0JBQXVCLFNBQVEsZ0JBQWdCO0lBRzNELFlBQVksR0FBUSxFQUFFLE1BQXlCO1FBQzlDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdEIsQ0FBQztJQUVELE9BQU87UUFDTixNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBRTdCLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVwQixJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUM7YUFDdEIsT0FBTyxDQUFDLFlBQVksQ0FBQzthQUNyQixPQUFPLENBQUMsK0NBQStDLENBQUM7YUFDeEQsV0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDMUIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFNUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVwRCxT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QUFnQixHQUFHLEtBQUssQ0FBQztnQkFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO2FBQ0QsY0FBYyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDN0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNqQyxTQUFTLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRXJDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO2dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTb3VuZHNjYXBlc1BsdWdpbiBmcm9tIFwibWFpblwiO1xuaW1wb3J0IHsgQXBwLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgZWxlY3Ryb24gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgeyBMb2NhbE11c2ljRmlsZSB9IGZyb20gXCJzcmMvVHlwZXMvSW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNvdW5kc2NhcGVzUGx1Z2luU2V0dGluZ3Mge1xuXHRzb3VuZHNjYXBlOiBzdHJpbmc7XG5cdHZvbHVtZTogbnVtYmVyO1xuXHRhdXRvcGxheTogYm9vbGVhbjtcblx0c2Nyb2xsU29uZ1RpdGxlOiBib29sZWFuO1xuXHRteU11c2ljSW5kZXg6IExvY2FsTXVzaWNGaWxlW107XG5cdG15TXVzaWNGb2xkZXJQYXRoOiBzdHJpbmc7XG5cdHJlaW5kZXhGcmVxdWVuY3k6IHN0cmluZztcblx0bXlNdXNpY1NodWZmbGU6IGJvb2xlYW47XG5cdGN1cnJlbnRUcmFja0luZGV4OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NFVFRJTkdTOiBTb3VuZHNjYXBlc1BsdWdpblNldHRpbmdzID0ge1xuXHRzb3VuZHNjYXBlOiBcIm15X211c2ljXCIsXG5cdHZvbHVtZTogMjUsXG5cdGF1dG9wbGF5OiBmYWxzZSxcblx0c2Nyb2xsU29uZ1RpdGxlOiB0cnVlLFxuXHRteU11c2ljSW5kZXg6IFtdLFxuXHRteU11c2ljRm9sZGVyUGF0aDogXCJcIixcblx0cmVpbmRleEZyZXF1ZW5jeTogXCI1XCIsXG5cdG15TXVzaWNTaHVmZmxlOiBmYWxzZSxcblx0Y3VycmVudFRyYWNrSW5kZXg6IDAsXG59O1xuXG5leHBvcnQgY2xhc3MgU291bmRzY2FwZXNTZXR0aW5nc1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuXHRwbHVnaW46IFNvdW5kc2NhcGVzUGx1Z2luO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IFNvdW5kc2NhcGVzUGx1Z2luKSB7XG5cdFx0c3VwZXIoYXBwLCBwbHVnaW4pO1xuXHRcdHRoaXMucGx1Z2luID0gcGx1Z2luO1xuXHR9XG5cblx0ZGlzcGxheSgpOiB2b2lkIHtcblx0XHRjb25zdCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xuXG5cdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoXCJTb3VuZHNjYXBlXCIpXG5cdFx0XHQuc2V0RGVzYyhgV2hpY2ggc291bmRzY2FwZSB3b3VsZCB5b3UgbGlrZSB0byBsaXN0ZW4gdG8/YClcblx0XHRcdC5hZGREcm9wZG93bigoY29tcG9uZW50KSA9PiB7XG5cdFx0XHRcdGNvbXBvbmVudC5hZGRPcHRpb24oXCJteV9tdXNpY1wiLCBcIk15IE11c2ljXCIpO1xuXG5cdFx0XHRcdGNvbXBvbmVudC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zb3VuZHNjYXBlKTtcblxuXHRcdFx0XHRjb21wb25lbnQub25DaGFuZ2UoKHZhbHVlOiBzdHJpbmcpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5jaGFuZ2VTb3VuZHNjYXBlKHZhbHVlKTtcblx0XHRcdFx0XHR0aGlzLmRpc3BsYXkoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoXCJBdXRvcGxheSBzb3VuZHNjYXBlXCIpXG5cdFx0XHQuc2V0RGVzYyhgQXV0b21hdGljYWxseSBwbGF5IGNob3NlbiBzb3VuZHNjYXBlIG9uIHN0YXJ0dXA/YClcblx0XHRcdC5hZGRUb2dnbGUoKGNvbXBvbmVudCkgPT4ge1xuXHRcdFx0XHRjb21wb25lbnQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYXV0b3BsYXkpO1xuXHRcdFx0XHRjb21wb25lbnQub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuYXV0b3BsYXkgPSB2YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoXCJTY3JvbGwgc29uZyB0aXRsZVwiKVxuXHRcdFx0LnNldERlc2MoYFNhdmUgc3BhY2Ugb24gdGhlIHN0YXR1cyBiYXIgYnkgc2Nyb2xsaW5nIHNvbmcgdGl0bGU/YClcblx0XHRcdC5hZGRUb2dnbGUoKGNvbXBvbmVudCkgPT4ge1xuXHRcdFx0XHRjb21wb25lbnQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc2Nyb2xsU29uZ1RpdGxlKTtcblx0XHRcdFx0Y29tcG9uZW50Lm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNjcm9sbFNvbmdUaXRsZSA9IHZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnRvZ2dsZU5vd1BsYXlpbmdTY3JvbGwoKTtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDFcIiwgeyB0ZXh0OiBcIk15IE11c2ljXCIgfSk7XG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoXCJwXCIsIHtcblx0XHRcdHRleHQ6IFwiVGhlIE15IE11c2ljIFNvdW5kc2NhcGUgcGxheXMgbXVzaWMgZmlsZXMgZnJvbSB5b3VyIGxvY2FsIGNvbXB1dGVyLiBJdCBpbmNsdWRlcyBhIGRlZGljYXRlZCB2aWV3IGZvciBtYW5hZ2luZyB5b3VyIG11c2ljIGluIGFkZGl0aW9uIHRvIHRoZSBtaW5pLXBsYXllciBvbiB0aGUgc3RhdHVzYmFyLlwiLFxuXHRcdH0pO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZShcIk11c2ljIHBhdGhcIilcblx0XHRcdC5zZXREZXNjKFxuXHRcdFx0XHRgUGF0aCB0byB3aGVyZSB5b3VyIG11c2ljIGZpbGVzIGFyZSBsb2NhdGVkLiBQbHVnaW4gd2lsbCBhbHNvIHNlYXJjaCB0aHJvdWdoIGFsbCBzdWJmb2xkZXJzIG9mIHRoZSBwcm92aWRlZCBmb2xkZXIuYCxcblx0XHRcdClcblx0XHRcdC5hZGRUZXh0KChjb21wb25lbnQpID0+IHtcblx0XHRcdFx0Y29tcG9uZW50LnNldERpc2FibGVkKHRydWUpO1xuXHRcdFx0XHRjb21wb25lbnQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubXlNdXNpY0ZvbGRlclBhdGgpO1xuXHRcdFx0fSlcblx0XHRcdC5hZGRFeHRyYUJ1dHRvbigoY29tcG9uZW50KSA9PiB7XG5cdFx0XHRcdGNvbXBvbmVudC5zZXRJY29uKFwiZm9sZGVyLW9wZW5cIik7XG5cdFx0XHRcdGNvbXBvbmVudC5zZXRUb29sdGlwKFwiU2VsZWN0IGZvbGRlclwiKTtcblxuXHRcdFx0XHRjb21wb25lbnQub25DbGljaygoKSA9PiB7XG5cdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRcdGVsZWN0cm9uLnJlbW90ZS5kaWFsb2dcblx0XHRcdFx0XHRcdC5zaG93T3BlbkRpYWxvZyh7XG5cdFx0XHRcdFx0XHRcdHByb3BlcnRpZXM6IFtcIm9wZW5EaXJlY3RvcnlcIl0sXG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBcIlNlbGVjdCBhIGZvbGRlclwiLFxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoIXJlc3VsdC5jYW5jZWxlZCkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLm15TXVzaWNGb2xkZXJQYXRoID1cblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5maWxlUGF0aHNbMF07XG5cdFx0XHRcdFx0XHRcdFx0Ly8gV2UgbmVlZCB0byByZXNldCB0aGUgaW5kZXggYW5kIGZvcmNlIGl0IHRvIHJlaW5kZXggbm93IHRoYXQgd2UgaGF2ZSBhIG5ldyBwYXRoXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MubXlNdXNpY0luZGV4ID0gW107XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5kaXNwbGF5KCk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uaW5kZXhNdXNpY0xpYnJhcnkoKTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5vblNvdW5kc2NhcGVDaGFuZ2UoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKFwiUGVyaW9kaWMgcmUtaW5kZXhcIilcblx0XHRcdC5zZXREZXNjKFxuXHRcdFx0XHRcIlRvIGtlZXAgeW91ciBtdXNpYyBsaWJyYXJ5IHVwIHRvIGRhdGUsIHRoZSBwbHVnaW4gbmVlZHMgdG8gb2NjYXNpb25hbGx5IHJlLWluZGV4IGZyb20geW91ciBtdXNpYyBmb2xkZXIuIFlvdSBjYW4gZGlzYWJsZSB0aGlzIGlmIHlvdSB3b3VsZCBwcmVmZXIgdG8gbWFudWFsbHkgdHJpZ2dlciByZS1pbmRleGVzLiBSZS1pbmRleGVzIHdpbGwgYWxzbyBiZSB0cmlnZ2VyZWQgb24gc3RhcnR1cCBvZiBPYnNpZGlhbiBvciB3aGVuIHRoZSBTb3VuZHNjYXBlIG9yIG11c2ljIGZvbGRlciBwYXRoIGFyZSBjaGFuZ2VkLlwiLFxuXHRcdFx0KVxuXHRcdFx0LmFkZERyb3Bkb3duKChjb21wb25lbnQpID0+IHtcblx0XHRcdFx0Y29tcG9uZW50LmFkZE9wdGlvbihcIm5ldmVyXCIsIFwiTmV2ZXJcIik7XG5cdFx0XHRcdGNvbXBvbmVudC5hZGRPcHRpb24oXCI1XCIsIFwiNSBNaW51dGVzIChkZWZhdWx0KVwiKTtcblx0XHRcdFx0Y29tcG9uZW50LmFkZE9wdGlvbihcIjE1XCIsIFwiMTUgTWludXRlc1wiKTtcblx0XHRcdFx0Y29tcG9uZW50LmFkZE9wdGlvbihcIjMwXCIsIFwiMzAgTWludXRlc1wiKTtcblx0XHRcdFx0Y29tcG9uZW50LmFkZE9wdGlvbihcIjYwXCIsIFwiNjAgTWludXRlc1wiKTtcblx0XHRcdFx0Y29tcG9uZW50LmFkZE9wdGlvbihcIjE0NDBcIiwgXCJEYWlseVwiKTtcblxuXHRcdFx0XHRjb21wb25lbnQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucmVpbmRleEZyZXF1ZW5jeSk7XG5cblx0XHRcdFx0Y29tcG9uZW50Lm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnJlaW5kZXhGcmVxdWVuY3kgPSB2YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR0aGlzLmRpc3BsYXkoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KVxuXHRcdFx0LmFkZEV4dHJhQnV0dG9uKChjb21wb25lbnQpID0+IHtcblx0XHRcdFx0Y29tcG9uZW50LnNldEljb24oXCJmb2xkZXItc3luY1wiKTtcblx0XHRcdFx0Y29tcG9uZW50LnNldFRvb2x0aXAoXCJSZS1pbmRleCBub3dcIik7XG5cblx0XHRcdFx0Y29tcG9uZW50Lm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLmluZGV4TXVzaWNMaWJyYXJ5KCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdH1cbn1cbiJdfQ==