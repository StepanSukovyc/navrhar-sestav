//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IKeyAction.cs                            </Name>
//    <Description> Delegát události pro klávesy                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-19                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using System.ComponentModel;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Delegát události pro klávesy
    /// </summary>
    public delegate ActionResult EventHandlerKeyAction();

    /// <summary>
    /// Možné výsledky provedení akce
    /// </summary>
    public enum ActionResult
    {
        /// <summary>
        /// akce nebyla provedená
        /// </summary>
        execute_none,
        /// <summary>
        /// akce provedená s výsledkem TRUE
        /// </summary>
        execute_true,
        /// <summary>
        /// akce provedená s výsledkem FALSE
        /// </summary>
        execute_false
    }
    /// <summary>
    /// Akce po stisknutí klávesy
    /// </summary>
    public interface IKeyAction
    {
        /// <summary>
        /// Událost činnosti
        /// </summary>
        event EventHandlerKeyAction OnActionEvent;
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        /// <returns>
        /// TRUE - pokud po reakci na událost se nemá nic jiného dít,
        /// FALSE - po reakci se zpráva posílá dál
        /// </returns>
        ActionResult Execute();
    }

    /// <summary>
    /// Abstractní implementace rozhraní IKeyAction
    /// </summary>
    public class AbstractKeyAction : IKeyAction
    {
        EventHandlerKeyAction actionEvent;
        /// <summary>
        /// Událost akce
        /// </summary>
        public event EventHandlerKeyAction OnActionEvent
        {
            add { if (actionEvent == null) actionEvent += value; }
            remove { actionEvent -= value; }
        }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        /// <returns>
        /// TRUE - pokud po reakci na událost se nemá nic jiného dít,
        /// FALSE - po reakci se zpráva posílá dál
        /// </returns>
        public ActionResult Execute()
        {
             return actionEvent != null ? actionEvent() : ActionResult.execute_none;
        }
    }

    /// <summary>
    /// Ovladač akcí
    /// </summary>
    public interface IKeyActionHandler
    {
        /// <summary>
        /// Získání objektu po levé stráně
        /// </summary>
        /// <returns></returns>
        IComponent GetLeftObject();
        /// <summary>
        /// Získání objektu po levé stráně
        /// </summary>
        /// <param name="obj">Od objektu</param>
        /// <returns></returns>
        IComponent GetLeftObject(object obj);
        /// <summary>
        /// Získání objektu po pravé stráně
        /// </summary>
        /// <returns></returns>
        IComponent GetRightObject();
        /// <summary>
        /// Získání objektu po pravé stráně
        /// </summary>
        /// <param name="obj">Od objektu</param>
        /// <returns></returns>
        IComponent GetRightObject(object obj);
        /// <summary>
        /// Získání objektu shora stráně
        /// </summary>
        /// <returns></returns>
        IComponent GetTopObject();
        /// <summary>
        /// Získání objektu shora stráně
        /// </summary>
        /// <param name="obj">Od objektu</param>
        /// <param name="sizeable">Míry objektu</param>
        /// <returns></returns>
        IComponent GetTopObject(object obj, ISizable sizeable);
        /// <summary>
        /// Získání objektu shora stráně
        /// </summary>
        /// <returns></returns>
        IComponent GetBottomObject();
        /// <summary>
        /// Získání objektu shora stráně
        /// </summary>
        /// <param name="obj">Od objektu</param>
        /// <param name="sizeable">Míry objektu</param>
        /// <returns></returns>
        IComponent GetBottomObject(object obj, ISizable sizeable);

    }
}
