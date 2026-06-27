import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { missionCompletedStyles as styles } from '../theme/styles';
import StatusBadge from '../components/StatusBadge';
import BottomTabBar from '../components/BottomTabBar';
import { useAuth } from '../context/AuthContext';

const SUMMARY = [
  { label: 'Pickup Location',   value: 'Batroun, North Lebanon' },
  { label: 'Drop-off Location', value: 'LWRC Center' },
  { label: 'Total Time',        value: '1h 18m' },
  { label: 'Distance Traveled', value: '45 km' },
];

export default function MissionCompletedScreen({ navigation }) {
  const { auth } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Mission Completed</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="call-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Success Badge */}
        <View style={styles.successSection}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={40} color="#fff" />
          </View>
          <Text style={styles.completedTitle}>Mission Completed!</Text>
          <Text style={styles.completedSub}>
            Great job! The animal has been{'\n'}delivered safely.
          </Text>
        </View>

        {/* Mission Card */}
        <View style={styles.missionCard}>
          <View style={styles.cardPhotoWrap}>
            <Text style={styles.cardEmoji}>🦉</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardAnimal}>Injured Owl</Text>
            <Text style={styles.cardId}>Mission ID: #M1287</Text>
          </View>
          <StatusBadge status="Delivered" small />
        </View>

        {/* Summary */}
        <Text style={styles.summaryHeader}>Summary</Text>

        <View style={styles.summaryCard}>
          {SUMMARY.map((row, idx) => (
            <View key={row.label} style={[styles.summaryRow, idx < SUMMARY.length - 1 && styles.summaryRowBorder]}>
              <Text style={styles.summaryLabel}>{row.label}</Text>
              <Text style={styles.summaryValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.historyBtn}
          onPress={() => navigation.navigate(auth.role === 'admin' ? 'Home' : 'VolunteerHome')}
          activeOpacity={0.85}
        >
          <Text style={styles.historyText}>Back to Dashboard</Text>
        </TouchableOpacity>

        <View style={{ height: 16 }} />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab={auth.role === 'admin' ? 'Dashboard' : 'My Mission'} />
    </SafeAreaView>
  );
}

