import config from '../../config';


export function assetSnapshotsAvgByMonth(assets) {
    var byMonth = [];
    var oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Get all unique months going back a year
    for (var i = 0; i < assets.length; i++) {
        var asset = assets[i];

        for (var j = 0; j < asset.snapshots.length; j++) {
            var snapshot = asset.snapshots.filter(s => new Date(s.created).getFullYear() <= oneYearAgo)[j];
            var month = new Date(snapshot.created).getMonth() + 1;

            if (!byMonth.map(x => x.month).includes(month)) {
                byMonth.push({
                    month: month,
                    values: [
                        snapshot.valueChange
                    ],
                    avg: 0,
                })
            } else {
                // eslint-disable-next-line
                var existingMonth = byMonth.filter(m => m.month === month)[0];
                existingMonth.values.push(snapshot.valueChange);
            }
        }
    }

    // Calculate average
    for (var k = 0; k < byMonth.length; k++) {
        var avgMonth = byMonth[k];
        var valuesLength = avgMonth.values.length;
        var valuesTotal = avgMonth.values.map(v => v)
                                      .reduce((sum, current) => sum + current, 0);

        avgMonth.avg = valuesTotal / valuesLength;
    }

    return byMonth.sort().reverse();
}

export function round(value) {
    return Math.round(value * 100) / 100;
}

export function federalTax() {
    return 0.3;
}
export function stateTax(state) {
    var tax = 0.05;

    if (!state) {
        return tax;
    }

    switch (state.toLowerCase()) {
        case "nc":
            tax = 0.0525;
            break;
        default:
            tax = 0.05;
            break;
    }

    return tax;
}

export function isCurrentUserAdmin(currentUser) {
    if (!currentUser) {
        return false;
    }
    
    var role = currentUser ? currentUser.role.name : null;

    if (role === null) {
        return false;
    } else if (config.adminRoles.includes(role)) {
        return true;
    } else {
        return false;
    }
}