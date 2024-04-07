//
// Copyright (C) Microsoft. All rights reserved.
//
/// <disable>JS2085.EnableStrictMode</disable>
"use strict";
var CloudExperienceHost;
(function (CloudExperienceHost) {
    var Hello;
    (function (Hello) {
        var helloEnrollmentManager = null;
        var helloEnrollmentResolver = null;
        function getSupportedHelloEnrollmentKinds() {
            if (CloudExperienceHostAPI.FeatureStaging.isOobeFeatureEnabled("OobeHelloResolver")) {
                return new WinJS.Promise(function (completeDispatch, errorDispatch) {
                    getHelloEnrollmentResolver().getSupportedEnrollmentKindsAsync().done(function (winrtKinds) {
                        var supportedKinds = {};
                        supportedKinds.face = (winrtKinds & CloudExperienceHostBroker.Hello.EnrollmentFlags.face);
                        supportedKinds.fingerprint = (winrtKinds & CloudExperienceHostBroker.Hello.EnrollmentFlags.fingerprint);
                        completeDispatch(JSON.stringify(supportedKinds));
                    }, function (e) { errorDispatch(e); });
                });
            }
            else {
                return new WinJS.Promise(function (completeDispatch, errorDispatch) {
                    getHelloEnrollmentManager().getSupportedEnrollmentKindsAsync().done(function (winrtKinds) {
                        var supportedKinds = {};
                        supportedKinds.face = (winrtKinds & CloudExperienceHostBroker.Hello.EnrollmentFlags.face);
                        supportedKinds.fingerprint = (winrtKinds & CloudExperienceHostBroker.Hello.EnrollmentFlags.fingerprint);
                        completeDispatch(JSON.stringify(supportedKinds));
                    }, function (e) { errorDispatch(e); });
                });
            }
        }
        Hello.getSupportedHelloEnrollmentKinds = getSupportedHelloEnrollmentKinds;
        function startHelloEnrollment(kind, appWindowLocation, enrollmentPersonality) {
            var winrtKind;
            if (kind && kind.face) {
                winrtKind = CloudExperienceHostBroker.Hello.EnrollmentFlags.face;
            }
            else if (kind && kind.fingerprint) {
                winrtKind = CloudExperienceHostBroker.Hello.EnrollmentFlags.fingerprint;
            }
            else {
                throw new CloudExperienceHost.InvalidArgumentError("No supported Hello enrollment type provided");
            }
            if (CloudExperienceHostAPI.FeatureStaging.isOobeFeatureEnabled("OobeHelloResolver")) {
                return new WinJS.Promise(function (completeDispatch, errorDispatch) {
                    getHelloEnrollmentResolver().showEnrollmentAsync(winrtKind, enrollmentPersonality, appWindowLocation).done(function (enrollmentResult) {
                        let enrollResult = {};
                        enrollResult.completed = (enrollmentResult === CloudExperienceHostBroker.Hello.EnrollmentResult.completed);
                        enrollResult.completedWithError = (enrollmentResult === CloudExperienceHostBroker.Hello.EnrollmentResult.completedWithError);
                        completeDispatch(JSON.stringify(enrollResult));
                    }, function (e) { errorDispatch(e); });
                });
            }
            else {
                return new WinJS.Promise(function (completeDispatch, errorDispatch) {
                    getHelloEnrollmentManager().showEnrollmentAsync(winrtKind, enrollmentPersonality, appWindowLocation).done(function (enrollmentResult) {
                        let enrollResult = {};
                        enrollResult.completed = (enrollmentResult === CloudExperienceHostBroker.Hello.EnrollmentResult.completed);
                        enrollResult.completedWithError = (enrollmentResult === CloudExperienceHostBroker.Hello.EnrollmentResult.completedWithError);
                        completeDispatch(JSON.stringify(enrollResult));
                    }, function (e) { errorDispatch(e); });
                });
            }
        }
        Hello.startHelloEnrollment = startHelloEnrollment;
        function updateWindowLocation(appWindowLocation) {
            if (CloudExperienceHostAPI.FeatureStaging.isOobeFeatureEnabled("OobeHelloResolver")) {
                getHelloEnrollmentResolver().updateWindowLocation(appWindowLocation);
            }
            else {
                getHelloEnrollmentManager().updateWindowLocation(appWindowLocation);
            }
        }
        Hello.updateWindowLocation = updateWindowLocation;
        function reportBioDataStorageConsentResponse(consentResponse) {
            if (CloudExperienceHostAPI.FeatureStaging.isOobeFeatureEnabled("OobeHelloResolver")) {
                getHelloEnrollmentResolver().reportBioDataStorageConsentResponse(consentResponse);
            }
            else {
                getHelloEnrollmentManager().reportBioDataStorageConsentResponse(consentResponse);
            }
        }
        Hello.reportBioDataStorageConsentResponse = reportBioDataStorageConsentResponse;
        function getHelloEnrollmentResolver() {
            if (helloEnrollmentResolver === null) {
                var userObj = CloudExperienceHost.IUserManager.getInstance().getIUser();
                helloEnrollmentResolver = CloudExperienceHostAPI.Hello.HelloEnrollmentResolverFactory.getHelloEnrollmentResolver(userObj);
            }
            return helloEnrollmentResolver;
        }
        function getHelloEnrollmentManager() {
            if (helloEnrollmentManager === null) {
                var userObj = CloudExperienceHost.IUserManager.getInstance().getIUser();
                helloEnrollmentManager = CloudExperienceHostBroker.Hello.HelloEnrollmentManagerFactory.getHelloEnrollmentManager(userObj);
            }
            return helloEnrollmentManager;
        }
    })(Hello = CloudExperienceHost.Hello || (CloudExperienceHost.Hello = {}));
})(CloudExperienceHost || (CloudExperienceHost = {}));
var CloudExperienceHost;
(function (CloudExperienceHost) {
    var HelloCleanup;
    (function (HelloCleanup) {
        function cleanupHelloEnrollment() {
            if (CloudExperienceHostAPI.FeatureStaging.isOobeFeatureEnabled("OobeHelloResolver")) {
                return new WinJS.Promise(function (completeDispatch, errorDispatch) {
                    var userObj = CloudExperienceHost.IUserManager.getInstance().getIUser();
                    var helloEnrollmentResolver = CloudExperienceHostAPI.Hello.HelloEnrollmentResolverFactory.getHelloEnrollmentResolver(userObj);
                    helloEnrollmentResolver.cleanupEnrollmentAsync().done(function () {
                        completeDispatch();
                    }, function (e) { errorDispatch(e); });
                });
            }
            else {
                return new WinJS.Promise(function (completeDispatch, errorDispatch) {
                    var helloEnrollmentManager = new CloudExperienceHostBroker.Hello.HelloEnrollmentManager();
                    helloEnrollmentManager.cleanupEnrollmentAsync().done(function () {
                        completeDispatch();
                    }, function (e) { errorDispatch(e); });
                });
            }
        }
        HelloCleanup.cleanupHelloEnrollment = cleanupHelloEnrollment;
    })(HelloCleanup = CloudExperienceHost.HelloCleanup || (CloudExperienceHost.HelloCleanup = {}));
})(CloudExperienceHost || (CloudExperienceHost = {}));
//# sourceMappingURL=Hello.js.map