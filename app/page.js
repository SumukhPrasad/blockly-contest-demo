import styles from '../styles/page.module.sass'
import BlocklyEditor from './components/blockly'



export default function Home() {
	return (
		<main className={styles.main}>
			<h1 className={styles.heading}>Blockly Maze Demo</h1>
			<BlocklyEditor>
			</BlocklyEditor>
		</main>
	)
}
