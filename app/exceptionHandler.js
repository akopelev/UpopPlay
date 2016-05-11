/* logger: display color-coded messages in "toasts" and to console 
 * relies on Angular injector to provide:
 *     $log - Angular's console logging facility
 */
(function () {

    angular.module('app').factory('$exceptionHandler', ['logger', function (logger) {
        return function (exception, cause) {
            exception.message += ' (caused by "' + cause + '")';
            logger.error("Извините, произошла ошибка", exception.message);
            throw exception;
        };
    }]);

})();