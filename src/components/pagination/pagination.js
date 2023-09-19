import {Image, Pressable, View, StyleSheet, Text} from "react-native";

export const Pagination = ({totalPages, selectPage, changePage}) => {
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
        pages = [...pages, i]
    }
    console.log(selectPage)
    return (

        totalPages > 10 ?
            <View style={styles.pagination}>
                {
                    selectPage > 0 ?
                        <Pressable onPress={() => changePage(selectPage - 1)} style={{marginRight: 6}}>
                            <Image source={require('./images/Left.png')}/>
                        </Pressable>
                        :
                        <View></View>
                }
                <Pressable style={styles.selectPageBlock}>
                    <Text>{pages[selectPage]}</Text>
                </Pressable>
                {
                    pages[selectPage+1]<totalPages?
                        <Pressable onPress={() => changePage(pages[selectPage+1])} style={styles.pageBlock}>
                            <Text style={styles.pageText}>{pages[selectPage+1]}</Text>
                        </Pressable>
                        :<View></View>
                }
                {
                    pages[selectPage+2]<totalPages?
                        <Pressable onPress={() => changePage(pages[selectPage+2])} style={styles.pageBlock}>
                            <Text style={styles.pageText}>{pages[selectPage+2]}</Text>
                        </Pressable>
                        :<View></View>
                }

                <Text>...</Text>
                {
                    pages[selectPage+1]<pages[pages.length-2]?
                        <Pressable onPress={() => changePage(pages[pages.length-2])} style={styles.pageBlock}>
                            <Text style={styles.pageText}>{pages[pages.length-2]}</Text>
                        </Pressable>
                        : <View></View>
                }
                {
                    pages[selectPage+1]<pages[pages.length-2]?
                        <Pressable onPress={() => changePage(pages[pages.length-1])} style={styles.pageBlock}>
                            <Text style={styles.pageText}>{pages[pages.length-1]}</Text>
                        </Pressable>
                        : <View></View>
                }
                {
                    pages[selectPage+1]<pages[pages.length-2]?
                        <Pressable onPress={() => changePage(pages[pages.length])} style={styles.pageBlock}>
                            <Text style={styles.pageText}>{pages[pages.length]}</Text>
                        </Pressable>
                        : <View></View>
                }

                {
                    selectPage + 1 < totalPages ?
                        <Pressable onPress={() => changePage(selectPage + 1)} style={{marginLeft: 6}}>
                            <Image source={require('./images/Right.png')}/>
                        </Pressable>
                        : <View></View>
                }
            </View>
            :
            <View style={styles.pagination}>
                {
                    selectPage > 0 ?
                        <Pressable onPress={() => changePage(selectPage - 1)} style={{marginRight: 6}}>
                            <Image source={require('./images/Left.png')}/>
                        </Pressable>
                        :
                        <View></View>
                }

                {
                    pages.map((el) =>
                        selectPage === el ?
                            <Pressable style={styles.selectPageBlock}>
                                <Text>{el + 1}</Text>
                            </Pressable>
                            :
                            <Pressable onPress={() => changePage(el)} style={styles.pageBlock}>
                                <Text style={styles.pageText}>{el + 1}</Text>
                            </Pressable>
                    )
                }
                {
                    selectPage + 1 < totalPages ?
                        <Pressable onPress={() => changePage(selectPage + 1)} style={{marginLeft: 6}}>
                            <Image source={require('./images/Right.png')}/>
                        </Pressable>
                        : <View></View>
                }

            </View>
    )
}
const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 25,
        justifyContent: 'center'
    },
    pageBlock: {
        paddingHorizontal: 8
    },
    pageText: {
        fontSize: 14,
    },
    selectPageBlock: {
        paddingHorizontal: 8,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#5F3C8F',
        borderStyle: 'solid'
    },
    selectPageText: {}
})