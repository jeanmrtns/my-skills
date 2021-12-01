import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface SkillCardProps extends TouchableOpacityProps {
  skill: string;
}

export function SkillCard({skill, onPress, ...rest}: SkillCardProps) {
  return (
    <TouchableOpacity style={styles.skillButton} activeOpacity={0.7} {...rest}>
      <Text style={styles.skillText}>{skill}</Text>
      <Icon name="trash" size={30} color="#4F8EF7" onPress={onPress} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  skillButton: {
    backgroundColor: '#1F1E25',
    padding: 10,
    borderRadius: 7,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skillText: {
    color: '#fff',
    fontSize: 16,
  },
});
