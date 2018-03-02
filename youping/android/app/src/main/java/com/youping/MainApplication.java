package com.youping;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.mg.app.PickerPackage;
import com.theweflex.react.WeChatPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.wix.autogrowtextinput.AutoGrowTextInputPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.theweflex.react.WeChatPackage;

import cn.jpush.reactnativejpush.JPushPackage;

import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private boolean SHUTDOWN_TOAST = false;
    private boolean SHUTDOWN_LOG = false;

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new PickerPackage(),
                    new WeChatPackage(),
                    new MapsPackage(),
                    new AutoGrowTextInputPackage(),
                    new RCTCameraPackage(),
                    new ReactMaterialKitPackage(),
                    new ReactNativeContacts(),
                    new WeChatPackage(),
                    new VectorIconsPackage(),
                    new ImagePickerPackage(),
                    new RNDeviceInfo(),
                    new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
