import { Button, Container, Text, Title, Modal, TextInput, Group, } from '@mantine/core';
import { useState, useRef, useEffect } from 'react';
import { MantineProvider, } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import { Card, ActionIcon, } from '@mantine/core';

export default function App() {
	const [tasks, setTasks] = useState([]);
	const [opened, setOpened] = useState(false);

	const taskTitle = useRef('');
	const taskDescription = useRef('');

	function createTask() {
		setTasks([
			...tasks,
			{
				title: taskTitle.current.value,
				summary: taskDescription.current.value,
			},
		]);

		saveTasks([
			...tasks,
			{
				title: taskTitle.current.value,
				summary: taskDescription.current.value,
			},
		]);
	}

	function deleteTask(index) {
		var clonedTasks = [...tasks];
		clonedTasks.splice(index, 1);

		setTasks(clonedTasks);
		saveTasks([...clonedTasks]);
	}

	function loadTasks() {
		let loadedTasks = localStorage.getItem('tasks');
		let tasks = JSON.parse(loadedTasks);
		if (tasks) { setTasks(tasks); }
	}

	function saveTasks(tasks) {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	function ListComponent( task , index ) {
		return (
		  <Card key={index} withBorder mt={'sm'}  sx={{backgroundColor: "aliceblue"}}>
			  <Group position={'apart'}>
				  <Text weight={'bold'}>{task.title}</Text>
				  <ActionIcon
					  onClick={() => {
						  deleteTask(index);
					  }}
					  color={'red'}
					  variant={'transparent'}>
					  <Trash />
				  </ActionIcon>
			  </Group>
			  <Text color={'dimmed'} size={'md'} mt={'sm'}>
				  {task.summary
					  ? task.summary
					  : 'No summary was provided for this task'}
			  </Text>
		  </Card>
		  )
	  }

	useEffect(() => {
		loadTasks();
	}, []);

	return (
		<MantineProvider>
			<div className='App'>
				<Container size={700} my={40}>
					<Group position={'apart'}>
						<Title sx={{ fontWeight:800, }}>
							TODO LIST
						</Title>
					</Group>

					{tasks.length > 0 ? (
						tasks.map((task, index) => {
							if (task.title) {
								return ListComponent(task, index);
							}
						})
					) : (
						<Text mt={'md'} color={'grey'}>
							No TODOs...
						</Text>
					)}
					<Button
						onClick={() => { setOpened(true); }}
						fullWidth
						mt={'md'}>
						New Task
					</Button>
				</Container>
			</div>
			<Modal
				opened={opened}
				title='New Task'
				withCloseButton={false}
				onClose={() => {
					setOpened(false);
				}}
				centered>
				<TextInput
					ref={taskTitle}
					placeholder='Title'
					required
					label='Title'
				/>
				<TextInput
					ref={taskDescription}
					placeholder='Description'
					label='Description'
				/>
				<Group mt={'md'}>
					<Button
						onClick={() => {
							setOpened(false);
						}}
						variant={'subtle'}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							createTask();
							setOpened(false);
						}}>
						Create
					</Button>
				</Group>
			</Modal>
		</MantineProvider>
	);
}
