import { createContext, Fragment, h } from "preact";
import CommanderPlugin from "src/main";
import CommandComponent from "./commandComponent";
import logo from "src/assets/commander-logo.svg";
import CommandManager from "src/manager/_commandManager";
import { chooseNewCommand } from "src/util";
import { arrayMoveMutable } from "array-move";
import { useEffect, useRef } from "preact/hooks";
import { setIcon } from "obsidian";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ManagerContext = createContext<CommandManager>(null!);

interface CommandViewerProps {
	manager: CommandManager;
	plugin: CommanderPlugin
}
export default function CommandViewer({ manager, plugin }: CommandViewerProps): h.JSX.Element {

	const addIcon = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		setIcon(addIcon.current!, "plus-circle");
	});

	return (
		<Fragment>
			<ManagerContext.Provider value={manager}>
				{manager.pairs.map((cmd, idx) => {
					return <CommandComponent
						key={cmd.id}
						pair={cmd}
						handleRemove={async (): Promise<void> => { await manager.removeCommand(cmd); this.forceUpdate(); }}
						handleUp={(): void => { arrayMoveMutable(manager.pairs, idx, idx - 1); manager.reorder(); this.forceUpdate(); }}
						handleDown={(): void => { arrayMoveMutable(manager.pairs, idx, idx + 1); manager.reorder(); this.forceUpdate(); }}
					/>;
				})}

				{manager.pairs.length === 0 && <div class="cmdr-commands-empty">
					{/* This isn't really dangerous,
					as the svg is inserted at build time and no other data can be passed to it */}
					<div class="cmdr-icon-wrapper" dangerouslySetInnerHTML={{ __html: logo }} />
					<p>No Commands added yet!</p>
				</div>}

				<div className="cmdr-add-new-wrapper">
					<button
						className="mod-cta"
						onClick={async (): Promise<void> => {
							const pair = await chooseNewCommand(plugin);
							await manager.addCommand(pair);
							this.forceUpdate();
						}}
					>
						<div ref={addIcon} />
						Add new
					</button>
				</div>
			</ManagerContext.Provider>
		</Fragment >
	);
}
