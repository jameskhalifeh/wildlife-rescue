import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { bottomTabBarStyles as styles } from '../theme/styles';
import { useAuth } from '../context/AuthContext';

const ADMIN_TABS = [
  { name: 'Dashboard',   icon: 'grid-outline',         activeIcon: 'grid',          route: 'Home' },
  { name: 'New Mission', icon: 'add-circle-outline',   activeIcon: 'add-circle',    route: 'NewMission' },
  { name: 'Volunteers',  icon: 'people-outline',       activeIcon: 'people',        route: 'Volunteers' },
  { name: 'Reports',     icon: 'document-text-outline',activeIcon: 'document-text', route: 'Reports' },
  { name: 'Admin',       icon: 'shield-outline',       activeIcon: 'shield',        route: 'Admin' },
];

const VOLUNTEER_TABS = [
  { name: 'Missions', icon: 'flag-outline',    activeIcon: 'flag',    route: 'VolunteerHome' },
  { name: 'Profile',  icon: 'person-outline',  activeIcon: 'person',  route: 'Profile' },
];

export default function BottomTabBar({ navigation, activeTab = 'Dashboard' }) {
  const insets = useSafeAreaInsets();
  const { auth } = useAuth();
  const tabs = auth.role === 'volunteer' ? VOLUNTEER_TABS : ADMIN_TABS;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 10 }]}>
      {tabs.map((tab) => {
        const active = tab.name === activeTab;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.route)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={active ? tab.activeIcon : tab.icon}
              size={22}
              color={active ? colors.tabActive : colors.tabInactive}
            />
            <Text style={[styles.label, active && styles.activeLabel]}>{tab.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
