let navbar = {
    templateUrl: 'js/components/common/navbar.html',
    controller: ['UsersService', '$state', '$interval', function (UsersService, $state, $interval) {
        'use strict'
        angular.extend(this, {
            $onInit() {
                var moment = require('moment');
                moment().format();
                var tick = () => {
                    this.timer = moment();
                }
                tick();
                $interval(tick, 1000);

                UsersService.getCurrent().then((user) => {
                    this.user = user
                }).catch((err) => {

                })
            },
            disconnect() {
                UsersService.disconnect().then(() => {
                    Materialize.toast('Disconnected', 4000, 'toast-warning')
                    this.user = null
                    $state.reload()
                })
            }

        })

    }]
}

export default navbar
