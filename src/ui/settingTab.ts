import { PluginSettingTab } from "obsidian";
import { h, render } from "preact";
import CommanderPlugin from "../main";
import settingTabComponent from "./components/settingTabComponent";

export default class CommanderSettingTab extends PluginSettingTab {
	private plugin: CommanderPlugin;

	public constructor(plugin: CommanderPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	public display(): void {
		render(h(settingTabComponent, { plugin: this.plugin }), this.containerEl);
	}

	public hide(): void {
		render(null, this.containerEl);
	}
}
