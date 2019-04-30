$(async () => {
	const launches = await fetch("https://api.spacexdata.com/v3/launches/").then(r => r.json())

	$("#launches").append(cardLaunch(launches))
	removeLoading('#loading')
})

const cardLaunch = data => data.map(launch => `
	<li class="media launch-item m-4">
		<img src="${launch.links.mission_patch_small ? launch.links.mission_patch_small : './src/img/elon.png'}" class="mr-3" alt="..." style="width: 64px;">
		<div class="media-body">
			<h5 class="mt-0 mb-1">${launch.mission_name}</h5>
			${launch.details ? launch.details.substring(0, 40) : ''}...
			<div>
				<p class="badge badge-info">${launch.launch_year}</p>
			</div>
		</div>
	</li>
`)

const removeLoading = (selector) => {
	$(selector).hide()
}
