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
				<div class="links mt-2 mb-2">
					<a class="ml-2 mr-2" target="_blank" href="${launch.links.article_link ? launch.links.article_link : '#'}"><i class="fas fa-link fa-2x"></i></a>
					<a class="ml-2 mr-2" target="_blank" href="${launch.links.video_link ? launch.links.video_link : '#'}"><i class="fab fa-youtube fa-2x"></i></a>
					<a class="ml-2 mr-2" target="_blank" href="${launch.links.wikipedia ? launch.links.wikipedia : '#'}"><i class="fab fa-wikipedia-w fa-2x"></i></a>
				</div>
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
