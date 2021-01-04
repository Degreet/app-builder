#!/usr/bin/env node

const commander = require('commander');
const inquirer = require('inquirer');
const loading = require('loading-cli');
const fs = require('fs');

commander.version('1.0.0').description('Speed initialization new project');

commander
	.command('create <name>')
	.alias('c')
	.description('Create new project')
	.action((name, cmd) => {
		inquirer
			.prompt({
				type: 'list',
				message: 'Select project type:',
				name: 'rawlist',
				choices: ['front-end', 'back-end', 'full-stack'],
			})
			.then(async (result) => {
				const type = result.rawlist;
				const loader = loading('Creating folder...').start();

				if (fs.existsSync(name)) {
					loader.text = 'Fail! There is already a folder with this name.';
					loader.color = 'red';
					loader.stop();
				} else {
					fs.mkdir(name, async () => {
						if (type == 'front-end') {
							loader.text = 'Creating front-end...';
							await installFrontEnd(name);
							loader.stop();
						} else if (type == 'back-end') {
							loader.text = 'Creating back-end...';
						} else {
							loader.text = 'Creating back-end...';
						}
					});
				}
			});
	});

async function installFrontEnd(name) {
	fs.readFile(
		`${__dirname}/template/front-end/index.html`,
		'utf8',
		(err, content) => {
			if (err) {
				console.error('Fail!');
			} else {
				fs.writeFile(`${name}/index.html`, content, () => {
					fs.mkdir(`${name}/css`, () => {
						fs.readFile(
							`${__dirname}/template/front-end/css/main.css`,
							(_, css) => {
								fs.writeFile(`${name}/css/main.css`, css, () => {
									fs.mkdir(`${name}/js`, () => {
										fs.readFile(
											`${__dirname}/template/front-end/js/main.js`,
											(_, mainjs) => {
												fs.writeFile(`${name}/js/main.js`, mainjs, () => {
													fs.mkdir(`${name}/js/modules`, () => {
														fs.readFile(
															`${__dirname}/template/front-end/js/modules/$.js`,
															(_, $js) => {
																fs.writeFile(
																	`${name}/js/modules/$.js`,
																	$js,
																	() => {
																		fs.mkdir(`${name}/src`, () => {
																			fs.readFile(
																				`${__dirname}/template/front-end/src/loader.svg`,
																				'utf8',
																				(_, svg) => {
																					fs.writeFile(
																						`${name}/src/loader.svg`,
																						svg,
																						() => {
																							console.log('App created!');
																						}
																					);
																				}
																			);
																		});
																	}
																);
															}
														);
													});
												});
											}
										);
									});
								});
							}
						);
					});
				});
			}
		}
	);

	return true;
}

commander.parse(process.argv);
