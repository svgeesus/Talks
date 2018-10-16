(async ()=>{

await Inspire.importsLoaded;

var pathIntro = $("#path-intro");
var pathIntroSVG = $("svg", pathIntro);
$.bind(pathIntro, "mousedown", evt => {
	var circle = evt.target;

	if (!circle.matches("circle")) {
		return;
	}
	
	var mavo = Mavo.get(pathIntro);
	var x = evt.clientX, y = evt.clientY;
	var center = {
		x: +circle.getAttribute("cx"),
		y: +circle.getAttribute("cy")
	};
	var pxPerUnit = pathIntroSVG.clientHeight / 100;
	var callback = evt => {
		var delta = {
			x: evt.clientX - x,
			y: evt.clientY - y
		};

		// circle.setAttribute("cx", center.x + delta.x / pxPerUnit	);
		var handleId = circle.id.match(/handle-(\d)/)[1];

		mavo.root.children["x" + handleId].value = center.x + delta.x / pxPerUnit;
		mavo.root.children["y" + handleId].value = center.y + delta.y / pxPerUnit;
	};
	document.addEventListener("mousemove", callback);
	document.addEventListener("mouseup", evt => {
		document.removeEventListener("mousemove", callback);
	}, {once: true});
});

})();
