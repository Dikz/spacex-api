$(async () => {
	const launches = await fetch("https://api.spacexdata.com/v3/launches/").then(r => r.json())
	launchesDone = launches.filter(launch => launch.upcoming == false).reverse()
	launchesUpcoming = launches.filter(launch => launch.upcoming == true)

	$("#launches").append(cardLaunch(launchesDone))
	$("#upcoming").append(cardUpcoming(launchesUpcoming))

	$(".loading").hide()

	$(".list-launches").show()
	$(".list-upcoming").show()
})

const cardLaunch = data => data.map(launch => `
	<li class="media launch-item m-4">
		<img src="${launch.links.mission_patch_small ? launch.links.mission_patch_small : './src/img/elon.png'}" class="mr-3" alt="..." style="width: 64px;">
		<div class="media-body">
			<h5 class="mt-0 mb-1"><span class="badge badge-dark">${launch.flight_number}</span> ${launch.mission_name}</h5>
			${launch.details ? launch.details.substring(0, 40) : ''}...
			<div>
				<p><span class="badge badge-danger">Rocket: ${launch.rocket.rocket_name}</span></p>
				<p class="badge badge-info">Year: ${launch.launch_year}</p>
			</div>
		</div>
	</li>
`)

const cardUpcoming = data => data.map(launch => `
	<div class="media mb-4 ml-5 m-4 text-light">
		<div class="media-body">
			<h5 class="mt-0 mb-1"><span class="badge badge-light">${launch.flight_number}</span> ${launch.mission_name}</h5>
			${launch.details ? launch.details.substring(0, 40) : 'No details yet'}...
			<div>
				<p class="badge badge-info">${launch.launch_year}</p>
			</div>
		</div>
		<img src="${launch.links.mission_patch_small ? launch.links.mission_patch_small : './src/img/elon.png'}" class="ml-3" alt="..." style="width: 64px;">
	</div>
`)
