console.log('welcome to here')

/**
 * 数据双向绑定
 * 采用发布者-订阅者模式
 * 思路：
 * 1.发布订阅者原型，它能处理多事件，有dom变化和数据变化2个事件监听，类似nodejs的事件处理机制
 *
 *
 * 1.监听所有需要进行数据双向绑定的dom元素的change事件，并且通过创建的发布者去发布消息
 * http://www.w3school.com.cn/jquery/jquery_ref_selectors.asp 【jquery选择器去监听指定元素】
 * 2.getAttribute无法获取dom引用对象的值，用data可以，不过用了jquery的attr，另外lucy.data() 是针对dom对象的。$.data(lucy) 是针对jquery对象的。
 * https://www.cnblogs.com/osinger/p/6015271.html
 * 这里有几个优化的点
 * 1：在view发生值变化触发change事件去触发数据set改变的时候，又会触发view的重新绘制，但是不需要，索性不会再次触发change事件
 * 否则死循环
 * 2.用到了jquery，增大了文件体积
 */

/**
 * 发布订阅原型
 * @constructor
 */
function PubSub () {
    // 存储事件名称和对应的回调函数，注意回调函数是个数组
    var events = {}

    // 订阅 存储事件
    this.subscribe = function (eventName, callback) {
        var callbacks = events[eventName] || []
        callbacks.push(callback)
        events[eventName] = callbacks
    }

    // 删除订阅事件，这里简单的全部删除
    this.delSubscribe = function (eventName) {
        if (!events[eventName]) {
            return false
        }
        events[eventName] = []
    }

    // 发布 调用相应的事件
    this.publish = function () {
        var eventName = [].shift.call(arguments)
        // 可以是this.events吗？当然可以
        var callbacks = events[eventName]

        if (!callbacks || callbacks.length === 0) {
            return false
        }

        for (var i = 0; i < callbacks.length; i++) {
            var callback = callbacks[i]
            callback.apply(this, arguments)
        }
    }
}

/**
 * 初始化发布订阅原型
 * @constructor
 */
function InstancePubSub (modelBind) {
    var pubSub = new PubSub()

    // model变化更新视图
    // jquery 选择器，其实就是css选择器，一般不要用，因为会遍历全部的dom元素，效率低，最好是id定位
    // 可能这个对象在多个元素上被绑定，所以需要遍历全部符合条件的元素
    pubSub.subscribe("model-change", function (modelName, newVal) {
        $("[" + modelBind +"=" + modelName + "]").each(function () {
            if ($(this).is("input, textarea, select")) {
                $(this).val(newVal);
            } else {
                $(this).html(newVal);
            }
        })
    })

    $(document).on("change", "[" + modelBind + "]", function (e) {
        pubSub.publish("view-change", $(this).attr(modelBind), $(this).val())
    })

    return pubSub
}

function Mvvm (modelBind) {
    modelBind = modelBind || "mvvm-model"
    var pubSubInstance = new InstancePubSub(modelBind)

    var mvvm = {
        properties: {},
        set: function (modelName, modelValue) {
            this.properties[modelName] = modelValue
            pubSubInstance.publish("model-change", modelName, modelValue)
        },
        get: function (modelName) {
            return this.properties[modelName]
        }
    }

    pubSubInstance.subscribe("view-change", function (modelName, modelValue) {
        mvvm.set(modelName, modelValue)
    })

    return mvvm
}

var mvvm = new Mvvm()

