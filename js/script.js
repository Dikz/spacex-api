$(async () => {
	const launches = await fetch("https://api.spacexdata.com/v3/launches/").then(r => r.json())

	// $("id or class div").append(cardJhon(launches))
})

const cardJhon = data => data.map(launch => `
	<p>${launch.mission_name}</p>
`)
