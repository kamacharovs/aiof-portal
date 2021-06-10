
export function assetSnapshotsAvgByMonth(assets) {
    let byMonth = [];

    // Get all unique months going back a year
    for (var i = 0; i < assets.length; i++) {
        let asset = assets[i];
        if (asset.snapshots) {
            for (var j = 0; j < asset.snapshots; j++) {
                let snapshot = asset.snapshots[j];
                let month = new Date(snapshot.created).getMonth();

                if (!byMonth.map(x => x.month).includes(month)) {
                    byMonth.push({
                         month: month,
                         values: [
                            snapshot.valueChange
                         ]
                    })
                } else {
                    byMonth.filter(m => m.month === month)[0]
                            .values.push(snapshot.valueChange);
                }
            }
        }
    }

    return byMonth;
}