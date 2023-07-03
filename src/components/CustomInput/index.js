import React, { useState } from 'react'
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import CustomText from '../CustomText'
import Icon from '../Icon'
import fonts from '../../assets/fonts'
import { useColors } from '../../theme/colors'

const CustomInput = ({
  label,
  value,
  setter,
  style = {},
  containerStyle = {},
  icon,
  secureTextEntry,
  date,
  dateIcon,
  error,
  inputHeight,
  inputStyle,
  defaultValue,
  ...props
}) => {
  const colors = useColors()
  const scheme = styles(colors)
  const [secure, setSecure] = useState(secureTextEntry ? true : false)
  return (
    <View style={style}>
      {label && <CustomText style={scheme.label}>{label}</CustomText>}
      <View style={[scheme.container, containerStyle]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon && (
            <Icon
              name={icon}
              family="custom"
              size={20}
              style={{ marginRight: 17 }}
            />
          )}
          <TextInput
            autoCapitalize={'none'}
            value={value}
            defaultValue={defaultValue}
            onChangeText={setter}
            secureTextEntry={secure}
            placeholderTextColor={colors.gray}
            style={[
              {
                fontVariant: ['tabular-nums'],
                color: colors.text,
                width: secureTextEntry ? '81%' : icon ? '89%' : '100%',
                paddingBottom: inputHeight
              },
              inputStyle
            ]}
            allowFontScaling={false}
            {...props}
          />
        </View>
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => {
              setSecure(p => !p)
            }}
          >
            <Icon
              name={secure ? 'eye' : 'eye-off'}
              family="feather"
              size={20}
              color={colors.icongray}
            />
          </TouchableOpacity>
        )}
        {date && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'red'
            }}
          >
            <DatePicker
              // date={date}
              style={{ width: 20, height: 20 }}
              mode="date"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              iconComponent={<Icon name={dateIcon} family="custom" />}
              customStyles={{
                dateInput: {
                  height: 0,
                  width: 0
                }
              }}
              onDateChange={date => {
                setter(date)
              }}
            />
          </View>
        )}
      </View>
      {error && (
        <CustomText style={{ color: colors.red, fontSize: 12 }}>
          {error}
        </CustomText>
      )}
    </View>
  )
}

export default CustomInput

const styles = colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: colors.lightgray,
      borderRadius: 10,
      justifyContent: 'space-between',
      ...Platform.select({
        ios: {
          paddingVertical: 12
        }
      })
    },
    label: { fontFamily: fonts.OpenSans, marginBottom: 10 }
  })
