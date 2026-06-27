import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { profileStyles as styles } from '../theme/styles';
import BottomTabBar from '../components/BottomTabBar';
import { useAuth } from '../context/AuthContext';

const STATS = [
  { label: 'Completed', value: '14', icon: 'checkmark-circle-outline', color: colors.tabActive },
  { label: 'Active',    value: '1',  icon: 'navigate-outline',         color: colors.accepted  },
  { label: 'Declined',  value: '2',  icon: 'close-circle-outline',     color: colors.danger    },
];

const INFO = [
  { icon: 'call-outline',     label: 'Phone',        value: '+961 70 123 456' },
  { icon: 'calendar-outline', label: 'Active Since',  value: 'January 2024'   },
  { icon: 'location-outline', label: 'Region',        value: 'North Lebanon'  },
];

export default function ProfileScreen({ navigation }) {
  const { auth, logout } = useAuth();
  const name = auth.user?.name ?? 'Volunteer';
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="settings-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{auth.user?.email ?? 'volunteer@wildlife.lb'}</Text>
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Active Volunteer</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {STATS.map(s => (
            <View key={s.label} style={styles.statCard}>
              <Ionicons name={s.icon} size={20} color={s.color} />
              <Text style={[styles.statNum, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoCard}>
          {INFO.map((item, idx) => (
            <View key={item.label} style={[styles.infoRow, idx < INFO.length - 1 && styles.infoRowBorder]}>
              <View style={styles.infoIconWrap}>
                <Ionicons name={item.icon} size={16} color={colors.tabActive} />
              </View>
              <View>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Specialties</Text>
        <View style={styles.chipsRow}>
          {['Birds', 'Mammals'].map(s => (
            <View key={s} style={styles.chip}>
              <Text style={styles.chipText}>{s}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 16 }} />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Profile" />
    </SafeAreaView>
  );
}
